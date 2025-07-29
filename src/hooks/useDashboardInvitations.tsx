import {
  keepPreviousData,
  useMutation,
  // UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';

import AlertDialog from '@/components/common/dialog/AlertDialog';
import {
  getDashboardInvitations,
  deleteDashboardInvitations,
} from '@/lib/api/dashboardInvitationsService';
import { getErrorMessage } from '@/lib/utils/getErrorResponse';
import { useDialogStore } from '@/stores/useDialogStore';
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
  const { openDialog } = useDialogStore();

  const query = useQuery<InvitationsResponse>({
    queryKey: ['dashboard-invitations', dashboardId, page, size],
    queryFn: () => getDashboardInvitations(dashboardId, params),
    enabled: !!dashboardId,
    placeholderData: keepPreviousData,
    retry: false,
  });

  useEffect(() => {
    if (!query.error) return;

    openDialog({
      dialogComponent: (
        <AlertDialog
          description={getErrorMessage(query.error)}
          closeBtnText="확인"
          navigate="/mydashboard"
        />
      ),
    });
  }, [query.error]);

  return query;
};

/*
 * 초대 삭제 hooks
 */
export const useDeleteInvitation = (dashboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: number) =>
      deleteDashboardInvitations(dashboardId, invitationId),
    retry: false,
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
