'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getMyInfo, changePassword } from '@/lib/api/auth';
import { updateMyInfo, uploadProfileImage } from '@/lib/api/users';
// import { useDialogStore } from '@/stores/useDialogStore';
// import AlertDialog from '@/components/common/dialog/AlertDialog';

// const a = () => {}

// 내 정보 가져오기
export const useMyInfo = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: getMyInfo,
    enabled: true,
  });
};

// 내 정보 업데이트
export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (data: { nickname: string; profileImageUrl: string }) => updateMyInfo(data),
    mutationFn: updateMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
    },
  });
};

// 이미지 업로드
export const useUploadProfileImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: async (file: File) => uploadProfileImage({ image: file }),
  });
};

// 비밀번호 변경
export const useChangePassword = () => {
  // import { useDialogStore } from '@/stores/useDialogStore';

  return useMutation({
    mutationFn: ({
      password,
      newPassword,
    }: {
      password: string;
      newPassword: string;
    }) => changePassword(password, newPassword),

    // onSuccess: () => {},
  });
};
