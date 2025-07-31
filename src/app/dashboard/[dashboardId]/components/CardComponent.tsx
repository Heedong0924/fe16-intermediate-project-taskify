'use client';

import Image from 'next/image';

import caleandar from '@/../public/images/icon/calendar.svg';
import { TagChip } from '@/components/common/Chips';
import TaskCardDialog from '@/components/common/dialog/TaskCardDialog';
import { useDialogStore } from '@/stores/useDialogStore';
import DetailCard from '@/types/DetailCard';

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
      className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-200 relative my-4 flex w-full cursor-pointer flex-col gap-4 rounded-lg border-1 p-4 md:flex-row md:gap-2 lg:flex-col"
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
        <div className="relative m-auto aspect-video w-[calc(100%-32px)] shrink-0 md:w-[260px] lg:h-[160px] lg:w-[274px]">
          <Image
            src={card.imageUrl}
            alt="카드 이미지"
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}
      <div className="flex w-full min-w-0 flex-col items-start justify-between gap-[6px]">
        <span>{card.title}</span>

        <div className="flex flex-wrap gap-1">
          {card.tags && card.tags.map((tag) => <TagChip>{tag}</TagChip>)}
        </div>

        {card.dueDate && (
          <div className="text-taskify-xs-medium text-taskify-neutral-500 flex flex-1 items-end gap-[6px]">
            <Image
              src={caleandar}
              alt="caleandar"
              className="h-[14px] w-[14px] md:h-[18px] md:w-[18px]"
              width={14}
              height={14}
            />
            <div>{card.dueDate}</div>
          </div>
        )}
      </div>
      {card.assignee?.profileImageUrl ? (
        <Image
          src={card.assignee.profileImageUrl}
          alt="작성자 프로필 이미지"
          className="absolute right-4 bottom-4 h-[22px] w-[22px] rounded-full md:h-6 md:w-6"
          width={22}
          height={22}
        />
      ) : (
        <div className="bg-taskify-neutral-400 h-[22px] w-[22px] shrink-0 rounded-full md:h-6 md:w-6" />
      )}
    </button>
  );
};

export default CardComponent;
