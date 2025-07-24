import {
  useMutation,
  // UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createDashboardInvitations,
  getDashboardInvitations,
  deleteDashboardInvitations,
} from '@/lib/api/dashboardInvitationsService';
import { InvitationsResponse } from '@/types/DashboardInvitation';

const DASHBOARD_INVITATIONS_KEY = (id: number) =>
  ['dashboard-invitations', id] as const;

/*
 * 초대 목록 hooks
 */
export const useDashboardInvitations = (dashboardsId: number) => {
  return useQuery<InvitationsResponse>({
    queryKey: DASHBOARD_INVITATIONS_KEY(dashboardsId),
    queryFn: () => getDashboardInvitations(dashboardsId),
    enabled: !!dashboardsId,
  });
};

/*
 * 초대 훅 hooks
 */
export const useInviteDashboardUser = (dashboardsId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) =>
      createDashboardInvitations(dashboardsId, email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_INVITATIONS_KEY(dashboardsId),
      });
    },
    onError: (error) => {
      console.error('초대 실패:', error);
    },
  });
};

/*
 * 초대 삭제 hooks
 */
export const useDeleteInvitation = (dashboardsId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: number) =>
      deleteDashboardInvitations(dashboardsId, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_INVITATIONS_KEY(dashboardsId),
      });
    },
  });
};
