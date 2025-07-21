import axiosInstance from '../axiosInstance';

export const uploadProfileImage = async ({
  file,
}: {
  file: File;
}): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post(`/users/me/image`, formData);

  return response.data.profileImageUrl;
};
