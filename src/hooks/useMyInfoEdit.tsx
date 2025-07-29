'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AlertDialog from '@/components/common/dialog/AlertDialog';
import { getMyInfo, changePassword } from '@/lib/api/auth';
import { updateMyInfo, uploadProfileImage } from '@/lib/api/users';
import { getErrorMessage, getErrorStatus } from '@/lib/utils/getErrorResponse';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDialogStore } from '@/stores/useDialogStore';

// 이미지 업로드
export const useUploadProfileImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: async (file: File) => uploadProfileImage({ image: file }),
  });
};

// 내 정보 가져오기
export const useMyInfo = () => {
  const { openDialog } = useDialogStore();
  const router = useRouter();

  const query = useQuery({
    queryKey: ['my-info'],
    queryFn: getMyInfo,
    enabled: true,
  });

  useEffect(() => {
    if (!query.error) return;

    const status = getErrorStatus(query.error);
    openDialog({
      dialogComponent: (
        <AlertDialog
          description={
            status !== 401
              ? getErrorMessage(query.error)
              : '로그인이 만료되었습니다.'
          }
          closeBtnText="확인"
        />
      ),
    });

    router.push('/');
  }, [query.error]);

  return query;
};

// 내 정보 업데이트
export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  const { openDialog } = useDialogStore();

  return useMutation({
    mutationFn: updateMyInfo,
    onSuccess: (upDateData) => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
      // 스토리지 업로드
      setUser({
        ...user!, // 기존 유저 정보 전체 유지
        nickname: upDateData.nickname,
        profileImageUrl: upDateData.profileImageUrl,
      });
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="프로필이 수정되었습니다."
            closeBtnText="확인"
          />
        ),
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      openDialog({
        dialogComponent: (
          <AlertDialog description={errorMessage} closeBtnText="확인" />
        ),
      });
    },
  });
};

// 비밀번호 변경
export const useChangePassword = () => {
  const { openDialog } = useDialogStore();

  return useMutation({
    mutationFn: ({
      password,
      newPassword,
    }: {
      password: string;
      newPassword: string;
    }) => changePassword(password, newPassword),
    onSuccess: () => {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="비밀번호가 수정되었습니다."
            closeBtnText="확인"
          />
        ),
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      const status = getErrorStatus(error);

      openDialog({
        dialogComponent: (
          <AlertDialog
            description={
              status !== 401 ? errorMessage : '로그인이 만료되었습니다.'
            }
            closeBtnText="확인"
          />
        ),
      });
    },
  });
};
