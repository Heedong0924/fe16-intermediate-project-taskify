import axiosInstance from '@/lib/axiosInstance';

export const getDashboardById = async (dashboardsId: number) => {
  const res = await axiosInstance.get(`/dashboards/${dashboardsId}`);
  return res.data;
};
