'use client';

import Image from 'next/image';

import caleandar from '@/../public/images/icon/calendar.svg';
import { TagChip } from '@/components/common/Chips';
import TaskCardDialog from '@/components/common/dialog/TaskCardDialog';
import { useDialogStore } from '@/stores/useDialogStore';
import DetailCard from '@/types/DatailCard';

const CardComponent = ({
  card,
  dashboardId,
  columId,
  columnName,
}: {
  card: DetailCard;
  dashboardId: number;
  columId: number;
  columnName: string;
}) => {
  const { openDialog } = useDialogStore();
  return (
    <button
      type="button"
      className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-200 my-4 flex w-full cursor-pointer flex-col gap-1 rounded-lg border-1 p-4 md:flex-row xl:flex-col"
      onClick={() =>
        openDialog({
          dialogComponent: (
            <TaskCardDialog
              dashboardId={dashboardId}
              columnId={columId}
              cardId={card.id}
              columnName={columnName}
            />
          ),
        })
      }
    >
      {card.imageUrl && (
        <Image src={card.imageUrl} alt="카드 이미지" className="xl:w-40" />
      )}
      <div className="flex w-full flex-col items-start gap-[6px]">
        <span>{card.title}</span>
        <div className="flex w-full flex-col gap-[6px] md:flex-row md:gap-4 xl:flex-col xl:gap-[6px]">
          <div className="flex gap-1">
            {card.tags && card.tags.map((tag) => <TagChip>{tag}</TagChip>)}
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="text-taskify-xs-medium text-taskify-neutral-500 flex flex-1 items-center gap-[6px]">
              <Image
                src={caleandar}
                alt="caleandar"
                className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]"
              />
              <div>{card.dueDate}</div>
            </div>
            {card.assignee.profileImageUrl ? (
              <Image
                src={card.assignee.profileImageUrl}
                alt="작성자 프로필 이미지"
                className="h-[22px] w-[22px] md:h-6 md:w-6"
              />
            ) : (
              <div className="h-[22px] w-[22px] shrink-0 rounded-full bg-green-500 md:h-6 md:w-6" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default CardComponent;
