'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import PaginationButton from '@/components/ui/PaginationButton';
import { Skeleton } from '@/components/ui/skeleton';
import { getDashboardMembers } from '@/lib/api/dashboardMemberService';
import { getDashboards } from '@/lib/api/dashboardService';
import { Member } from '@/types/DashboardMember';

import DashboardListItem from './DashboardListItem';
import NewDashboardCard from './NewDashboardCard';

const DashboardList = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [gridCols, setGridCols] = useState('lg:grid-cols-5');
  const [membersMap, setMembersMap] = useState<Record<number, Member[]>>({});

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

  useEffect(() => {
    const fetchMembers = async () => {
      if (!dashboards.length) return;

      try {
        const updatedMembersMap: Record<number, Member[]> = {};

        const promises = dashboards.map((dashboard) =>
          getDashboardMembers({ dashboardId: dashboard.id }).then((res) => {
            updatedMembersMap[dashboard.id] = res.members;
          }),
        );

        await Promise.all(promises);
        setMembersMap(updatedMembersMap);
      } catch {
        console.log('something');
      }
    };

    fetchMembers();
  }, [dashboards]);

  // 반응형 크기에 따라 페이지당 출력하는 대시보드 목록 변경하는 로직
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(5); // 모바일
      } else if (width < 1024) {
        setItemsPerPage(5); // 태블릿
      } else if (width >= 1300) {
        // PC 큰 화면: 새로운 버튼 + 카드 4개
        setItemsPerPage(4);
        setGridCols('lg:grid-cols-5');
      } else {
        // PC 작은 화면: 새로운 버튼 + 카드 3개
        setItemsPerPage(3);
        setGridCols('lg:grid-cols-4');
      }
    };

    updateItemsPerPage(); // 초기 설정
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1000px] lg:mt-1">
      <div
        className={`mt-4.5 grid grid-cols-1 justify-items-center gap-2.5 md:grid-cols-2 ${gridCols}`}
      >
        <NewDashboardCard />
        {dashboards.map((dashboard) => (
          <DashboardListItem
            key={dashboard.id}
            dashboard={dashboard}
            members={membersMap[dashboard.id] ?? []}
          />
        ))}
      </div>
      <div className="absolute right-5.5 bottom-4 flex justify-end md:bottom-3 lg:bottom-5">
        <PaginationButton
          page={page}
          size={itemsPerPage}
          totalCount={data?.totalCount ?? 0}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default DashboardList;
