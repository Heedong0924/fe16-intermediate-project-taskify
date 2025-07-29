import { User } from '@/types/User.type';

import axiosInstance from '../axiosInstance';

type UserWithTimestamps = User & {
  createdAt: string;
  updatedAt: string;
};

export const uploadProfileImage = async ({
  image,
}: {
  image: File;
}): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await axiosInstance.post(`/users/me/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.profileImageUrl;
};

// 내 정보 수정
export const updateMyInfo = async ({
  nickname,
  profileImageUrl,
}: {
  nickname: string;
  profileImageUrl?: string;
}): Promise<UserWithTimestamps> => {
  const response = await axiosInstance.put(`/users/me`, {
    nickname,
    profileImageUrl,
  });
  return response.data;
};
