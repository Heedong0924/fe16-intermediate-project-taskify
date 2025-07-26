import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getDashboardMembers,
  deleteDashboardMembers,
} from '@/lib/api/dashboardMemberService';
import { MemberResponse, MemberQueryParams } from '@/types/DashboardMember';

/*
 * 대시보드 멤버 목록 hooks
 */
export const useDashboardMember = (params: MemberQueryParams) => {
  const { page, size, dashboardId } = params;
  return useQuery<MemberResponse>({
    queryKey: ['dashboard-member', page, size, dashboardId],
    queryFn: () => getDashboardMembers(params),
    enabled: !!dashboardId,
    placeholderData: keepPreviousData,
  });
};

/*
 * 대시보드 멤버 삭제 hooks
 */
export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => deleteDashboardMembers(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-member'],
      });
    },
  });
};
