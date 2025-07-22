'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  postSignup,
  SignupRequest,
  SignupResponse,
  postLogin,
  LoginRequest,
  LoginResponse,
} from '@/lib/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
  // 1) Zustand 스토어에서 상태·액션 가져오기
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);

  const router = useRouter();

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
      console.error('Login failed:', err);
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
      console.error('Signup failed:', err);
    },
  });

  return {
    user,
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
