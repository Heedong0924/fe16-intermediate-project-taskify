import { InvitationsResponse } from '@/types/DashboardInvitation';

import axiosInstance from '../axiosInstance';

// 대시보드 초대 목록
export const getDashboardInvitations = async (
  dashboardsId: number,
): Promise<InvitationsResponse> => {
  const response = await axiosInstance.get<InvitationsResponse>(
    `/dashboards/${dashboardsId}/invitations`,
  );
  return response.data;
};

// 대시보드 초대 하기
export const createDashboardInvitations = async (
  dashboardsId: number,
  email: string,
): Promise<InvitationsResponse> => {
  const response = await axiosInstance.post<InvitationsResponse>(
    `/dashboards/${dashboardsId}/invitations`,
    { email },
  );
  return response.data;
};

// 대시보드 초대 삭제
export const deleteDashboardInvitations = async (
  dashboardsId: number,
  invitationId: number,
): Promise<void> => {
  await axiosInstance.delete(
    `/dashboards/${dashboardsId}/invitations/${invitationId}`,
  );
};
