import axiosInstance from '../axiosInstance';

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
