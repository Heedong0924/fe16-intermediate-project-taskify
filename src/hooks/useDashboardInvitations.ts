import {
  keepPreviousData,
  useMutation,
  // UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  // createDashboardInvitations,
  getDashboardInvitations,
  deleteDashboardInvitations,
} from '@/lib/api/dashboardInvitationsService';
import {
  InvitationsResponse,
  InvitationsQueryParams,
} from '@/types/DashboardInvitation';

/*
 * 초대 목록 hooks
 */
export const useDashboardInvitations = (
  dashboardId: number,
  params: InvitationsQueryParams,
) => {
  const { page, size } = params;

  return useQuery<InvitationsResponse>({
    queryKey: ['dashboard-invitations', dashboardId, page, size],
    queryFn: () => getDashboardInvitations(dashboardId, params),
    enabled: !!dashboardId,
    placeholderData: keepPreviousData,
  });
};

/*
 * 초대 삭제 hooks
 */
export const useDeleteInvitation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: number) =>
      deleteDashboardInvitations(dashboardId, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-invitations', dashboardId],
      });
    },
  });
};

/*
 * 초대 훅 hooks
 */
// export const useInviteDashboardUser = (dashboardId: number) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (email: string) =>
//       createDashboardInvitations(dashboardId, email),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: DASHBOARD_INVITATIONS_KEY(dashboardId),
//       });
//     },
//     onError: (error) => {
//       console.error('초대 실패:', error);
//     },
//   });
// };
