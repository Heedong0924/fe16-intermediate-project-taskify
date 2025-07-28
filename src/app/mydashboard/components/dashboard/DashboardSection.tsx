'use client';

import { useQuery } from '@tanstack/react-query';

import CreateDashboardDialog from '@/components/common/dialog/CreateDashboardDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getDashboards } from '@/lib/api/dashboardService';
import { useDialogStore } from '@/stores/useDialogStore';

import DashboardList from './DashboardList';
import NewDashboard from './NewDashboard';

// 대시보드 리스트 총괄
const DashboardSection = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['dashboards'],
    queryFn: () =>
      getDashboards({
        navigationMethod: 'pagination',
        page: 1,
        size: 100,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const { openDialog } = useDialogStore();

  if (isPending) return <Skeleton />;
  if (isError) return <div>에러 발생: {error.message}</div>;

  const hasDashboards = (data?.dashboards?.length ?? 0) > 0;

  // 기존 대시보드 목록이 없을 시 새로운 대시보드 만들 수 있는 버튼 출력
  return (
    <div className="bg-taskify-neutral-0 mb-14 flex h-[550px] w-[340px] flex-col rounded-2xl p-6 px-[15px] md:h-[360px] md:w-[620px] lg:h-[330px] lg:w-[1022px]">
      <h1 className="text-taskify-2xl-bold text-taskify-neutral-700 md:ml-4 lg:ml-4">
        대시보드
      </h1>
      {hasDashboards ? (
        <DashboardList />
      ) : (
        <div
          role="button"
          tabIndex={0}
          className="flex flex-1 cursor-pointer items-center justify-center"
          onClick={() =>
            openDialog({
              dialogComponent: <CreateDashboardDialog />,
            })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              openDialog({ dialogComponent: <CreateDashboardDialog /> });
            }
          }}
        >
          <NewDashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardSection;
