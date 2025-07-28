import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  updateDashboard,
  getDashboardById,
  deleteDashboard,
} from '@/lib/api/dashboardService';

/*
 * 대시보드 ID로 대시보드 상세 정보 가져오는 hooks
 */
export const useDashboard = (dashboardsId: number) => {
  // 데이터 fetching 훅
  return useQuery({
    queryKey: ['dashboard', dashboardsId],
    queryFn: () => getDashboardById(dashboardsId), // 대시보드 기존 데이터 가져옴
    enabled: !!dashboardsId, // undefined나 0면 비활성화
  });
};

/*
 * 대시보드의 제목과 색상을 수정 가능한 hooks
 */
export const useUpdateDashboard = (dashboardsId: number) => {
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
    },
  });
};

/*
 * 대시보드 삭제
 */
export const useDeleteDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => deleteDashboard(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
    },
  });
};
