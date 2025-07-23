import axiosInstance from '@/lib/axiosInstance';
import Column, { ColumnResponse } from '@/types/Column';

export const createColumn = async ({
  title,
  dashboardId,
}: {
  title: string;
  dashboardId: number;
}): Promise<Column> => {
  const res = await axiosInstance.post('/columns', { title, dashboardId });
  return res.data;
};

export const getColumn = async (
  dashboardId: number,
): Promise<ColumnResponse> => {
  const res = await axiosInstance.get<ColumnResponse>('/columns', {
    params: { dashboardId },
  });
  return res.data;
};

export const updateColumn = async (
  columnId: number,
  title: string,
): Promise<Column> => {
  const res = await axiosInstance.put(`/columns/${columnId}`, {
    title,
  });
  return res.data;
};

export const deleteColumn = async (columnId: number): Promise<Column> => {
  const res = await axiosInstance.delete(`/columns/${columnId}`);
  return res.data;
};

export const cardImageUpload = async (
  columnsId: number,
  image: File,
): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  const res = await axiosInstance.post(
    `/columns/${columnsId}/card-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
};
