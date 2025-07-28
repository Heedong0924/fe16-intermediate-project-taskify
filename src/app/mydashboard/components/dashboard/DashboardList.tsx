'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import PaginationButton from '@/components/ui/PaginationButton';
import { Skeleton } from '@/components/ui/skeleton';
import { getDashboards } from '@/lib/api/dashboardService';

import DashboardListItem from './DashboardListItem';
import NewDashboardCard from './NewDashboardCard';

const DashboardList = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['dashboards', page, itemsPerPage],
    queryFn: () =>
      getDashboards({
        navigationMethod: 'pagination',
        page,
        size: itemsPerPage,
      }),
    staleTime: 1000 * 60 * 5,
  });

  // 펜딩과 에러 처리 수정 필요(임시)
  if (isPending) <Skeleton />;
  if (isError) <p>에러가 발생했습니다. {error.message}</p>;

  const dashboards = data?.dashboards ?? [];

  // 반응형 크기에 따라 페이지당 출력하는 대시보드 목록 변경하는 로직
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(5); // 모바일
      } else if (width < 1024) {
        setItemsPerPage(5); // 태블릿
      } else {
        setItemsPerPage(4); // 데스크탑
      }
    };

    updateItemsPerPage(); // 초기 설정
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  return (
    <>
      <div className="mx-auto w-full max-w-[1000px] px-3 lg:mt-1">
        <div className="mt-4.5 grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-5">
          <NewDashboardCard />
          {dashboards.map((dashboard) => (
            <DashboardListItem key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
      </div>
      <div className="absolute top-[495px] left-[170px] flex justify-center md:top-[388px] md:left-[585px] lg:top-[350px] lg:left-[1145px]">
        <PaginationButton
          page={page}
          size={itemsPerPage}
          totalCount={data?.totalCount ?? 0}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default DashboardList;
