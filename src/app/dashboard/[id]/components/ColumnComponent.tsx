'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import arrowDropDown from '@/../public/images/icon/arrowDropDown.svg';
import settingIcon from '@/../public/images/icon/settings.svg';
import { AddCountChip, CounterChip } from '@/components/common/Chips';
import ColumnSettingsDialog from '@/components/common/dialog/ColumnSettingsDialog';
import CreateColumnDialog from '@/components/common/dialog/CreateColumnDialog';
import Button from '@/components/ui/Buttons';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getCardList } from '@/lib/api/cardService';
import { useDialogStore } from '@/stores/useDialogStore';
import Column from '@/types/Column';
import { DetailCardResponse } from '@/types/DatailCard';

import CardComponent from './CardComponent';

const ColumnComponent = ({
  column,
  dashboardId,
}: {
  column: Column;
  dashboardId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const observer = useRef<HTMLDivElement>(null);
  const columnId = column?.id;

  const itemSize = 10;

  const { openDialog } = useDialogStore();

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery<DetailCardResponse>({
    queryKey: ['cards', columnId],
    queryFn: async ({ pageParam }) => {
      const currentCursorId = pageParam as number;
      return getCardList({
        size: itemSize,
        cursorId: currentCursorId,
        columnId,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.cursorId === null ||
        typeof lastPage.cursorId === 'undefined'
      ) {
        return undefined;
      }
      return lastPage.cursorId;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!columnId,
  });

  useEffect(() => {
    const currentObserver = observer.current;

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (currentObserver) {
      io.observe(currentObserver);
    }
    return () => {
      if (currentObserver) {
        io.disconnect();
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div>카드를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return (
      <div>
        카드 리스트를 불러오는데 실패했습니다!:{' '}
        {error.message || '알 수 없는 에러'}
      </div>
    );
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const cards = data?.pages.flatMap((page) => page.cards) || [];
  const totalCountRes = data?.pages[0]?.totalCount;
  const totalCount = totalCountRes ?? 0;

  return (
    <section className="shrink-0 border-r-1 px-5 xl:max-w-[354px]">
      <div className="border-taskify-neutral-300 flex h-full shrink-0 flex-col border-t-1 pt-[22px]">
        <div className="flex shrink-0 items-center justify-between">
          <div className="flex items-center">
            <p className="bg-taskify-violet-primary h-2 w-2 shrink-0 rounded-full" />
            <span className="text-taskify-2lg-bold mx-2">{column.title}</span>
            <CounterChip>{totalCount}</CounterChip>
          </div>
          <div className="flex gap-2">
            <button onClick={handleToggle} type="button">
              {isOpen ? (
                <Image
                  src={arrowDropDown}
                  className="scale-y-[-1] transform"
                  alt="open the toggle"
                />
              ) : (
                <Image src={arrowDropDown} alt="close the toggle" />
              )}
            </button>
            <button
              onClick={() =>
                openDialog({
                  dialogComponent: (
                    <ColumnSettingsDialog
                      columnId={columnId}
                      columnName={column.title}
                    />
                  ),
                })
              }
              className="cursor-pointer"
              type="button"
            >
              <Image
                src={settingIcon}
                alt="칼럼 수정 버튼"
                className="lx:w-6 lx:h-6 h-5 w-5 md:h-[22px] md:w-[22px]"
              />
            </button>
          </div>
        </div>
        <Button
          onClick={() =>
            openDialog({
              dialogComponent: <CreateColumnDialog dashboardId={dashboardId} />,
            })
          }
          color="white-black"
          className="btn-addTodo mt-5 mb-4 shrink-0"
        >
          <AddCountChip size="sm" />
        </Button>
        <ScrollArea className="max-h-full w-full grow flex-col overflow-auto">
          {cards &&
            isOpen &&
            cards?.map((card) => (
              <CardComponent
                key={card.id}
                card={card}
                dashboardId={dashboardId}
                columId={columnId}
                columnName={column.title}
              />
            ))}
          {isFetchingNextPage && <div>로딩중...</div>}
          {cards.length === 0 && !isFetching && (
            <div className="text-taskify-gray-400 mt-5 p-4 text-center">
              아직 할 일이 없습니다.
              <br /> 새 할 일을 추가해보세요!
            </div>
          )}
          <div ref={observer} className="h-5" />
          <ScrollBar className="hidden" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default ColumnComponent;
