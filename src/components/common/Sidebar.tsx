'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import addIcon from '@/../public/images/icon/addBox.svg';
import { getDashboards } from '@/lib/api/dashboardService';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useDialogStore } from '@/stores/useDialogStore';
import { Dashboard, DashboardResponse } from '@/types/Dashboard';

import DashboardCard from './DashboardCrad';
import PaginationButton from '../ui/PaginationButton';
import { LogoMd } from '../ui/SVGLogo';
import CreateDashboardDialog from './dialog/CreateDashboardDialog';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import SkeletonParagraph from '../ui/SkeletonParagraph';

const Sidebar = () => {
  const [page, setPage] = useState<number>(1);

  const itemsSize = 15;

  const { openDialog } = useDialogStore();
  const { setDashboards } = useDashboardStore();

  const {
    data, // API 응답 데이터 (DashboardResponse 타입)
    isLoading, // 로딩 중 여부
    isError, // 에러 발생 여부
    error, // 발생한 에러 객체
  } = useQuery<DashboardResponse, Error>({
    // TData, TError 타입 명시
    queryKey: ['dashboards', { page, size: itemsSize }], // 쿼리 키: 데이터와 종속성을 식별
    queryFn: async () =>
      getDashboards({
        navigationMethod: 'pagination', // 명세에 따라 'pagination' 명시
        page,
        size: itemsSize,
      }),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지 (선택 사항)
    placeholderData: (prev) => prev, // 이전 데이터를 유지하며 새 데이터 로딩 (UX 개선)
  });

  useEffect(() => {
    if (data) setDashboards(data.dashboards);
  }, [data, setDashboards]);

  if (isLoading) {
    return (
      <aside className="text-taskify-neutral-500 bg-taskify-neutral-0 fixed z-40 hidden h-screen w-[160px] animate-pulse rounded-md shadow-md transition-all duration-300 md:block lg:w-[300px]">
        <div className="px-2 py-5">
          <Skeleton className="h-[34px] w-[110px] rounded-xl" />

          <div className="mt-10">
            <Skeleton className="mb-1 h-10 w-full rounded-xl" />

            <SkeletonParagraph
              paragraphClassName="gap-2"
              lineClassName="h-[36px] w-full rounded-xl"
              isFadingOut
              lines={10}
            />
          </div>
        </div>
      </aside>
    );
  }

  if (isError) {
    return (
      <div>대시보드 불러오기 실패: {error?.message || '알 수 없는 에러'}</div>
    );
  }

  const dashboards: Dashboard[] = data?.dashboards || [];
  const totalCount: number = data?.totalCount || 0;

  return (
    <aside className="text-taskify-neutral-500 bg-taskify-neutral-0 left-0ntop-0 fixed z-40 hidden h-screen w-[160px] shadow-md transition-all duration-300 md:block lg:w-[300px]">
      <div className="px-2 py-5">
        <Link href="/">
          <LogoMd width={110} height={34} />
        </Link>
        <div className="mt-10">
          <button
            onClick={() =>
              openDialog({
                dialogComponent: <CreateDashboardDialog />,
              })
            }
            className="hover:bg-taskify-violet-light mb-1 flex h-10 w-full cursor-pointer items-center justify-between rounded-sm"
            type="button"
          >
            <div className="text-taskify-md-semibold flex justify-between">
              Dash Boards
            </div>
            <Image
              src={addIcon}
              alt="add to dashboard"
              width={20}
              height={20}
            />
          </button>
          <ScrollArea className="h-screen pb-40">
            <div className="w-[144px] transition-all duration-300 lg:w-[284px]">
              {dashboards.map((dashboard) => (
                <DashboardCard
                  key={dashboard.id}
                  dashboard={dashboard}
                  className="hover:bg-taskify-violet-light h-[42px] rounded-sm"
                />
              ))}
            </div>
            {totalCount > 15 && (
              <PaginationButton
                page={page}
                size={itemsSize}
                totalCount={totalCount}
                onPageChange={setPage}
                className="mt-6 flex justify-end lg:mr-2"
              />
            )}
            <ScrollBar className="hidden" />
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
