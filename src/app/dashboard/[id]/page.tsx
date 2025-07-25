'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { AddCountChip } from '@/components/common/Chips';
import CreateColumnDialog from '@/components/common/dialog/CreateColumnDialog';
import Button from '@/components/ui/Buttons';
import { getColumn } from '@/lib/api/columnService';
import { useDialogStore } from '@/stores/useDialogStore';
import { ColumnResponse } from '@/types/Column';

import ColumnComponent from './components/ColumnComponent';

const DashboardIdPage = () => {
  const Prams = useParams();
  const { openDialog } = useDialogStore();

  const rawDashboardId = Prams.id as string;
  const dashboardId = Number(rawDashboardId);

  const { data, isLoading, isError, error } = useQuery<ColumnResponse>({
    queryKey: ['columns', dashboardId],
    queryFn: async () => getColumn(dashboardId),
    enabled: !!dashboardId,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  if (isLoading) {
    return (
      <div className="p-4 text-center text-lg font-medium">
        칼럼 불러오는 중...
      </div>
    );
  }

  if (isError) {
    return <div>칼럼 불러오기 실패: {error?.message || '알 수 없는 에러'}</div>;
  }

  const columns = data?.data;

  return (
    <div className="flex h-full max-w-full grow flex-col xl:flex-row">
      {columns &&
        columns?.map((column) =>
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
        className="btn-addCol fixed right-5 bottom-0 left-5 my-5 flex shrink-0 md:ml-[160px] xl:static xl:w-[534px]"
      >
        <span className="mr-3">새로운 컬럼 시작하기</span>
        <AddCountChip size="sm" />
      </Button>
    </div>
  );
};

export default DashboardIdPage;
