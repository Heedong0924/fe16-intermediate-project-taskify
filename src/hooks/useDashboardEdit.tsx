import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
// import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AlertDialog from '@/components/common/dialog/AlertDialog';
import {
  updateDashboard,
  getDashboardById,
  deleteDashboard,
} from '@/lib/api/dashboardService';
import { useDialogStore } from '@/stores/useDialogStore';
import { Dashboard } from '@/types/Dashboard';

/*
 * 대시보드 ID로 대시보드 상세 정보 가져오는 hooks
 */
export const useDashboard = (dashboardsId: number, enabled = true) => {
  const { openDialog } = useDialogStore();
  const router = useRouter();

  const query = useQuery<Dashboard, AxiosError>({
    queryKey: ['dashboard', dashboardsId] as const,
    queryFn: () => getDashboardById(dashboardsId),
    enabled: !!dashboardsId && enabled,
  });

  // 에러 발생 시 처리
  useEffect(() => {
    if (!query.error) return;

    const getErrorMessage = (error: unknown): string => {
      if (isAxiosError(error)) {
        const data = error.response?.data as { message?: string };
        return data?.message ?? error.message;
      }

      if (error instanceof Error) return error.message;
      return '오류가 발생했습니다.';
    };

    openDialog({
      dialogComponent: (
        <AlertDialog
          description={getErrorMessage(query.error)}
          closeBtnText="확인"
        />
      ),
    });

    router.push('/mydashboard');
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
    // 성공할 때 실행되는 함수
    onSuccess: () => {
      // 새로고침 없이도 수정된 데이터가 반영
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
      const errorMessage =
        error instanceof Error ? error.message : '오류가 발생했습니다.';
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
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => deleteDashboard(memberId),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
      options?.onSuccess?.(...args);
    },
    ...options,
    // onError: (error) => {},
  });
};
