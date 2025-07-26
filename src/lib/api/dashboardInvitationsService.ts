import {
  InvitationsResponse,
  InvitationsQueryParams,
} from '@/types/DashboardInvitation';

import axiosInstance from '../axiosInstance';

// 대시보드 초대 목록
export const getDashboardInvitations = async (
  dashboardId: number,
  params: InvitationsQueryParams,
): Promise<InvitationsResponse> => {
  const response = await axiosInstance.get<InvitationsResponse>(
    `/dashboards/${dashboardId}/invitations`,
    { params },
  );
  return response.data;
};

// 대시보드 초대 하기
export const createDashboardInvitations = async (
  dashboardId: number,
  email: string,
): Promise<InvitationsResponse> => {
  const response = await axiosInstance.post<InvitationsResponse>(
    `/dashboards/${dashboardId}/invitations`,
    { email },
  );
  return response.data;
};

// 대시보드 초대 삭제
export const deleteDashboardInvitations = async (
  dashboardId: number,
  invitationId: number,
): Promise<void> => {
  await axiosInstance.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
};
