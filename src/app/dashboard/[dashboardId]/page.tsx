'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { AddCountChip } from '@/components/common/Chips';
import CreateColumnDialog from '@/components/common/dialog/CreateColumnDialog';
import Button from '@/components/ui/Buttons';
import { getColumn } from '@/lib/api/columnService';
import { getDashboardById } from '@/lib/api/dashboardService';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useDialogStore } from '@/stores/useDialogStore';
import { ColumnResponse } from '@/types/Column';

import ColumnComponent from './components/ColumnComponent';

// 헤더 내 상세페이지 상태 연결(타이틀, 아이디)
const DashboardIdPage = () => {
  const Params = useParams();
  const { openDialog } = useDialogStore();

  const rawDashboardId = Params.dashboardId as string;

  const dashboardId = Number(rawDashboardId);

  const { dashboardTitle, setDashboardTitle, setDashboardId } =
    useDashboardStore();

  useEffect(() => {
    const fetchDashboardTitle = async () => {
      try {
        const dashboard = await getDashboardById(dashboardId);
        setDashboardTitle(dashboard.title);
      } catch (error) {
        console.error('Failed to fetch dashboard title:', error);
      }
    };

    if (dashboardId) {
      setDashboardId(dashboardId);
      fetchDashboardTitle();
    }
  }, [dashboardId]);

  // 메타데이터 동적 페이지 타이틀 설정

  useEffect(() => {
    if (dashboardTitle) {
      document.title = `${dashboardTitle} | Taskify`;
    }
  }, [dashboardTitle]);

  const { data, isLoading, isError, error } = useQuery<ColumnResponse>({
    queryKey: ['columns', dashboardId],
    queryFn: async () => getColumn(dashboardId),
    enabled: !!dashboardId,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>칼럼 불러오기 실패: {error?.message || '알 수 없는 에러'}</div>;
  }

  const columns = data?.data;

  return (
    <div className="flex h-full max-w-full grow flex-col pt-[119px] md:pt-[59px] xl:flex-row">
      {columns?.map((column) =>
        column ? (
          <ColumnComponent
            dashboardId={dashboardId}
            key={column.id}
            column={column}
          />
        ) : null,
      )}
      <div className="h-24 shrink-0 xl:hidden" />
      <Button
        onClick={() =>
          openDialog({
            dialogComponent: <CreateColumnDialog dashboardId={dashboardId} />,
          })
        }
        color="violet-white"
        className="btn-addCol fixed right-5 bottom-0 left-5 z-5 my-5 flex shrink-0 md:ml-[160px] xl:static xl:mx-5 xl:w-[534px]"
      >
        <span className="mr-3">새로운 컬럼 시작하기</span>
        <AddCountChip size="sm" />
      </Button>
    </div>
  );
};

export default DashboardIdPage;
