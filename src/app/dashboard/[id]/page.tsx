// - '새로운 컬럼 추가하기' 버튼을 클릭하면 컬럼 추가하기 모달이 나타나도록 하세요.
// - 각 컬럼의 '+' 버튼을 클릭하면 해당 컬럼 할 일 생성 모달이 나타나도록 하세요.
// - 각 컬럼의 '톱니바퀴' 버튼을 클릭하면 컬럼 수정 모달이 나타나도록 하세요.
// - 생성된 할 일 카드를 클릭하면 해당 카드 상세 모달이 나타나도록 하세요.
// - 각 칼럼의 카드들은 무한 스크롤로 이어지도록 하세요.

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { AddCountChip } from '@/components/common/Chips';
import Button from '@/components/ui/Buttons';
import { getColumn } from '@/lib/api/columnService';
import { ColumnResponse } from '@/types/Column';

import ColumnComponent from './components/ColumnComponent';

const DashboardIdPage = () => {
  const Prams = useParams();

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
    <div className="relative flex h-full grow flex-col xl:flex-row">
      {columns &&
        columns?.map((column) =>
          column ? <ColumnComponent key={column.id} column={column} /> : null,
        )}
      <Button
        color="white-black"
        className="btn-addCol fixed bottom-0 mx-5 my-5 flex shrink-0 xl:relative"
      >
        <span className="mr-3">새로운 컬럼 시작하기</span>
        <AddCountChip size="sm" />
      </Button>
    </div>
  );
};

export default DashboardIdPage;

// pc 사이즈 미만에서는 각 칼럼 드롭다운 가능하면 좋겠는데

// createCards 모달
