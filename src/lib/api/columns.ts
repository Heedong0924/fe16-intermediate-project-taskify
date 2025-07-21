import axiosInstance from '../axiosInstance';

export const uploadCardImage = async ({
  columnId,
  file,
}: {
  columnId: number;
  file: File;
}): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post(
    `/columns/${columnId}/card-image`,
    formData,
  );

  return response.data.imageUrl;
};
