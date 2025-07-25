'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import addIcon from '@/../public/images/icon/addBox.svg';
import { getDashboards } from '@/lib/api/dashboardService';
import { useDialogStore } from '@/stores/useDialogStore';
import { Dashboard, DashboardResponse } from '@/types/Dashboard';

import DashboardCard from './DashboardCrad';
import PaginationButton from '../ui/PaginationButton';
import { LogoMd } from '../ui/SVGLogo';
import CreateDashboardDialog from './dialog/CreateDashboardDialog';

const Sidebar = () => {
  const [page, setPage] = useState<number>(1);

  const itemsSize = 15;

  const { openDialog } = useDialogStore();

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

  if (isLoading) {
    return (
      <div className="p-4 text-center text-lg font-medium">
        대시보드를 불러오는 중...
      </div>
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
    <aside className="text-taskify-neutral-500 bg-taskify-neutral-0 left-0ntop-0 fixed z-40 hidden h-full min-h-screen w-[160px] shadow-md md:block xl:w-[300px]">
      <div className="px-2 py-5">
        <Link href="/">
          <LogoMd />
        </Link>
        <div className="mt-14">
          <button
            onClick={() =>
              openDialog({
                dialogComponent: <CreateDashboardDialog />,
              })
            }
            className="hover:bg-taskify-neutral-200 mb-[15px] flex h-5 w-full items-center justify-between"
            type="button"
          >
            <div className="text-taskify-md-semibold my-4 flex justify-between">
              Dash Boards
            </div>
            <Image src={addIcon} alt="add to dashboard" />
          </button>
          <div className="">
            {dashboards.map((dashboard) => (
              <DashboardCard
                key={dashboard.id}
                dashboard={dashboard}
                className="hover:bg-taskify-neutral-200 h-[42px]"
              />
            ))}
          </div>
          {totalCount !== 0 && (
            <PaginationButton
              page={page}
              size={itemsSize}
              totalCount={totalCount}
              text={false}
              onPageChange={setPage}
              className="mt-6"
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
