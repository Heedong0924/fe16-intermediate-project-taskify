import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import AlertDialog from '@/components/common/dialog/AlertDialog';
import {
  updateDashboard,
  getDashboardById,
  deleteDashboard,
} from '@/lib/api/dashboardService';
import { getErrorMessage, getErrorStatus } from '@/lib/utils/getErrorResponse';
import { useDialogStore } from '@/stores/useDialogStore';
import { Dashboard } from '@/types/Dashboard';

/*
 * 대시보드 ID로 대시보드 상세 정보 가져오는 hooks
 */
export const useDashboard = (dashboardsId: number) => {
  const { openDialog } = useDialogStore();

  const query = useQuery<Dashboard, AxiosError>({
    queryKey: ['dashboard', dashboardsId] as const,
    queryFn: () => getDashboardById(dashboardsId),
    enabled: !!dashboardsId,
    retry: false,
  });

  // 에러 발생 시 처리
  useEffect(() => {
    if (!query.error) return;

    const status = getErrorStatus(query.error);

    openDialog({
      dialogComponent: (
        <AlertDialog
          description={
            status !== 401
              ? getErrorMessage(query.error)
              : '로그인이 만료되었습니다.'
          }
          closeBtnText="확인"
          navigate="/mydashboard"
        />
      ),
    });
  }, [query.error]);

  return query;
};

/*
 * 대시보드의 제목과 색상을 수정 가능한 hooks
 */
export const useUpdateDashboard = (dashboardsId: number) => {
  const { openDialog } = useDialogStore();

  const queryClient = useQueryClient();

  // 데이터 수정 요청 훅
  return useMutation({
    // 객체를 받아서 대시보드를 업데이트
    mutationFn: (data: { title: string; color: string }) =>
      updateDashboard(dashboardsId, data),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', dashboardsId] });
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="대시보드가 수정되었습니다."
            closeBtnText="확인"
          />
        ),
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      openDialog({
        dialogComponent: (
          <AlertDialog description={errorMessage} closeBtnText="확인" />
        ),
      });
    },
  });
};

/*
 * 대시보드 삭제
 */
export const useDeleteDashboard = (
  options?: UseMutationOptions<void, Error, number>,
) => {
  const queryClient = useQueryClient();
  const { openDialog } = useDialogStore();

  return useMutation({
    mutationFn: (memberId: number) => deleteDashboard(memberId),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
      options?.onSuccess?.(...args);
    },
    ...options,
    retry: false,
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      openDialog({
        dialogComponent: (
          <AlertDialog description={errorMessage} closeBtnText="확인" />
        ),
      });
    },
  });
};
