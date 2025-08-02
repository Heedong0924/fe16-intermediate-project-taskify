'use client';

import { useQuery } from '@tanstack/react-query';

import CreateDashboardDialog from '@/components/common/dialog/CreateDashboardDialog';
import SkeletonLine from '@/components/ui/SkeletonLIne';
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

  if (isPending) {
    return (
      <div className="bg-taskify-neutral-0 mb-10 flex h-[550px] w-full max-w-[330px] flex-col rounded-2xl p-6 px-[15px] md:mt-3 md:h-[360px] md:w-full md:max-w-[620px] lg:mt-5 lg:h-[330px] lg:w-full lg:max-w-[1022px]">
        <h1 className="text-taskify-2xl-bold text-taskify-neutral-700 mb-6 md:ml-4 lg:ml-4">
          대시보드
        </h1>

        {/* 대시보드 카드들 */}
        <div className="mx-auto w-full max-w-[1000px] lg:mt-1">
          <div className="mt-4.5 grid grid-cols-1 justify-items-center gap-2.5 md:grid-cols-2 lg:grid-cols-5">
            {/* 대시보드 카드들 - 타이틀과 멤버카운트만 스켈레톤 */}
            {['skeleton-1', 'skeleton-2', 'skeleton-3', 'skeleton-4'].map(
              (id) => (
                <div
                  key={id}
                  className="flex min-h-[58px] w-full max-w-[290px] flex-col items-start justify-between gap-2 rounded-lg border p-4 md:min-h-[68px] md:w-full md:max-w-[275px] md:flex-row lg:min-h-[165px] lg:w-[165px] lg:flex-col"
                >
                  {/* 2. 대시보드 카드 타이틀 스켈레톤 */}
                  <div className="flex items-center gap-2 md:flex-1 lg:w-full">
                    <SkeletonLine
                      className="h-5 w-32 md:w-24 lg:w-28"
                      isFadingOut={false}
                    />
                  </div>

                  {/* 3. 멤버 카운트 문구 스켈레톤 */}
                  <div className="hidden lg:mb-2 lg:block">
                    <SkeletonLine className="h-4 w-16" isFadingOut={false} />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <div>에러 발생: {error.message}</div>;

  const hasDashboards = (data?.dashboards?.length ?? 0) > 0;

  // 기존 대시보드 목록이 없을 시 새로운 대시보드 만들 수 있는 버튼 출력
  return (
    <div className="bg-taskify-neutral-0 relative mb-10 flex h-[550px] w-full max-w-[330px] flex-col rounded-2xl p-6 px-[15px] md:mt-3 md:h-[360px] md:w-full md:max-w-[620px] lg:mt-5 lg:h-[330px] lg:w-full lg:max-w-[1022px]">
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
