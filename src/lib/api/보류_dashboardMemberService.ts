import { Member } from '@/types/보류_DashboardMember';

import axiosInstance from '../axiosInstance';

export const getDashboardMembers = async (
  teamId: number,
): Promise<Member[]> => {
  const res = await axiosInstance.get(`/dashboards/${teamId}/members`);
  return res.data;
};
