// - 각 컬럼 오른쪽에 해당 카드 개수가 보이도록 하세요. - 칼럼 이름 옆 chip?
// - '새로운 컬럼 추가하기' 버튼을 클릭하면 컬럼 추가하기 모달이 나타나도록 하세요.
// - 각 컬럼의 '+' 버튼을 클릭하면 해당 컬럼 할 일 생성 모달이 나타나도록 하세요.
// - 각 컬럼의 '톱니바퀴' 버튼을 클릭하면 컬럼 수정 모달이 나타나도록 하세요.
// - 생성된 할 일 카드를 클릭하면 해당 카드 상세 모달이 나타나도록 하세요.
// - 각 칼럼의 카드들은 무한 스크롤로 이어지도록 하세요.

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import Button from '@/components/ui/Buttons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getColumn } from '@/lib/api/columnService';
import { ColumnResponse } from '@/types/Column';

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
    <div className="mt-[120px] md:mt-[60px] md:ml-40 xl:ml-[300px]">
      <ScrollArea className="w-full">
        <div className="xl:overflow-y-auto">
          {columns &&
            columns.map((column) => (
              <div className="w-full px-5 pt-[22px] xl:max-w-[354px]">
                <div>{column.title}</div>
                <Button color="white-black" className="btn-addTodo" />
                <span>투두들</span>
                <span>투두들</span>
                <span>투두들</span>
              </div>
            ))}
          <Button color="white-black" className="btn-addCol" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardIdPage;

// 각 칼럼은 무한스크롤 - 이것도 pc사이즈에서만? - 칼럼 컴포넌트 분리 하자 어차피 받아서 map 해줘야하는데 지저분해 */}
// 한 번에 만들고 분리해주자 xl:max-w-[354px]
// columns.title?
// 여기에 title옆 카드 개수 chip 및 톱니바퀴 아이콘 버튼
// pc 사이즈 미만에서는 각 칼럼 드롭다운 가능하면 좋겠는데

// createCards 모달

// cards 목록조회 api

// 음...tablet이랑 mobail에서는 fixed 로 화면 아래에 고정시켜놔야하나
// <Scrollbar orientation="horizontal" />
// 스크롤바 ui가 필요한가?
