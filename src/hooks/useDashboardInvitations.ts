import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createDashboardInvitations,
  getDashboardInvitations,
  deleteDashboardInvitations,
} from '@/lib/api/dashboardInvitationsService';
import { InvitationsResponse } from '@/types/DashboardInvitation';

/*
 * 초대 목록 hooks
 */
export const useDashboardInvitations = (dashboardsId: number) => {
  return useQuery<InvitationsResponse>({
    queryKey: ['dashboard-invitations', dashboardsId],
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
        queryKey: ['dashboardInvitations', dashboardsId],
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
export const useDeleteInvitation = (
  dashboardsId: number,
): UseMutationResult<void, Error, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, unknown>({
    mutationFn: (invitationId: number) =>
      deleteDashboardInvitations(dashboardsId, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-invitations', dashboardsId],
      });
    },
  });
};
