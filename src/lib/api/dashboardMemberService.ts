import { MemberResponse, MemberQueryParams } from '@/types/DashboardMember';

import axiosInstance from '../axiosInstance';

// 대시보드 멤버 목록
export const getDashboardMembers = async (
  params: MemberQueryParams,
): Promise<MemberResponse> => {
  const response = await axiosInstance.get<MemberResponse>(`/members`, {
    params,
  });
  return response.data;
};

// 대시보드 멤버 삭제
export const deleteDashboardMembers = async (
  memberId: number,
): Promise<void> => {
  await axiosInstance.delete(`/members/${memberId}`);
};
