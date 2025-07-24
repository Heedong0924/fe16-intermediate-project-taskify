import axiosInstance from '@/lib/axiosInstance';

export const getDashboardById = async (id: number) => {
  const res = await axiosInstance.get(`/dashboards/${id}`);
  return res.data;
};
