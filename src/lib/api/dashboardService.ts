import axiosInstance from '@/lib/axiosInstance';
import Dashboard from '@/types/Dashboard';
import { InvitationResponse } from '@/types/InvitationResponse';

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
