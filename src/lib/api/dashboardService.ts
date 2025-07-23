import axiosInstance from '@/lib/axiosInstance';
import {
  Dashboard,
  DashboardQueryParams,
  DashboardResponse,
} from '@/types/Dashboard';
import { InvitationResponse } from '@/types/InvitationResponse';

export const getDashboards = async (
  params: DashboardQueryParams, // 파라미터를 객체로 받음
): Promise<DashboardResponse> => {
  const response = await axiosInstance.get<DashboardResponse>('/dashboards', {
    params,
  });
  return response.data;
};

export const createDashboard = async ({
  title,
  color,
}: {
  title: string;
  color: string;
}): Promise<Dashboard> => {
  const res = await axiosInstance.post('/dashboards', { title, color });
  return res.data;
};

export const updateDashboard = async (
  dashboardsId: number,
  { title, color }: { title: string; color: string },
): Promise<Dashboard> => {
  const res = await axiosInstance.put(`/dashboards/${dashboardsId}`, {
    title,
    color,
  });
  return res.data;
};

export const createInvitations = async ({
  dashboardId,
  email,
}: {
  dashboardId: number;
  email: string;
}): Promise<InvitationResponse> => {
  const res = await axiosInstance.post(
    `/dashboards/${dashboardId}/invitations`,
    { email },
  );
  return res.data;
};
