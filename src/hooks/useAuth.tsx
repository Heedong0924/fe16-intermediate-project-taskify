'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import AlertDialog from '@/components/common/dialog/AlertDialog';
import {
  postSignup,
  SignupRequest,
  SignupResponse,
  postLogin,
  LoginRequest,
  LoginResponse,
} from '@/lib/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDialogStore } from '@/stores/useDialogStore';

/**
 * useAuth 훅
 * - 로그인, 회원가입, 로그아웃 기능을 제공
 * - Zustand 스토어를 사용하여 사용자 정보와 인증 상태 관리
 * - React Query를 사용하여 API 요청 처리
 * - 로그인 성공 시 사용자 정보를 스토어에 저장하고 리다이렉트
 * - 회원가입 성공 시 자동으로 로그인 처리
 * - 에러 발생 시 에러 메시지 반환
 * - 로딩 상태 관리
 * * @returns {
 *  user: ServeUser | null; // 현재 로그인한 사용자 정보
 *  accessToken: string | null; // 현재 로그인한 사용자의 액세스 토큰
 * isAuth: boolean; // 현재 로그인 상태 여부
 * isLoading: boolean; // 로그인 또는 회원가입 요청 중 로딩 상태
 * error: Error | null; // 발생한 에러 객체
 * login: (data: LoginRequest) => void; // 로그인 함수
 * signup: (data: SignupRequest) => void; // 회원가입 함수
 * logout: () => void; // 로그아웃 함수
 * }
 *
 */

export const useAuth = () => {
  // Zustand 스토어에서 상태·액션 가져오기
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const accessToken = useAuthStore((state) => state.accessToken);
  const router = useRouter();

  // 다이얼로그 스토어에서 openDialog 액션 가져오기
  const { openDialog } = useDialogStore();
  const errorDialog = (message: string, err: Error) => {
    let errorMsg = '알 수 없는 오류';
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMsg = err.response.data.message as string;
    }
    openDialog({
      dialogComponent: (
        <AlertDialog
          description={`${message} ${errorMsg}`}
          closeBtnText="확인"
        />
      ),
    });
  };

  // 2) 로그인 mutation 선언
  const {
    mutate: login, // 훅 반환 시 login()으로 호출
    isPending: isLoginLoading, // 로딩 상태
    error: loginError, // 에러 객체
  } = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (requestBody) => postLogin(requestBody),
    onSuccess: (data) => {
      // 로그인 성공 시 스토어에 저장하고 리다이렉트
      console.log('Login 성공함:', data);
      setToken(data.accessToken);
      setUser(data.user);

      router.push('/');
    },
    onError: (err) => {
      errorDialog('로그인에 실패했습니다.', err);
    },
  });

  // 3) 회원가입 mutation 선언 (성공 시 자동으로 login 호출)
  const {
    mutate: signup, // 훅 반환 시 signup()으로 호출
    isPending: isSignupLoading, // 로딩 상태
    error: signupError, // 에러 객체
  } = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (requestBody) => postSignup(requestBody),
    onSuccess: (_data, variables) => {
      console.log('회원가입 성공함:', _data);
      // 회원가입 성공 후, 회원가입때 입력한 정보로 자동 로그인
      login({
        email: variables.email,
        password: variables.password,
      });
    },
    onError: (err) => {
      errorDialog('회원가입에 실패했습니다.', err);
    },
  });

  return {
    user,
    accessToken,
    isAuth,
    // 두 mutation 중 하나라도 로딩 중이면 true
    isLoading: isLoginLoading || isSignupLoading,
    // 발생한 에러 중 우선순위로 반환
    error: loginError || signupError,
    login,
    signup,
    logout,
  };
};
