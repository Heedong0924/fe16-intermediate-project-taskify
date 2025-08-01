import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import SkeletonLine from '@/components/ui/SkeletonLIne';
import SkeletonParagraph from '@/components/ui/SkeletonParagraph';
import { useSkeleton } from '@/hooks/useSkeleton';
import { getCard } from '@/lib/api/cardService';

import CardAuthor from '../../../app/dialog-components/CardAuthor';
import Comments from '../../../app/dialog-components/Comments';
import TaskCardChipStatus from '../../../app/dialog-components/TaskCardChipStatus';
import TaskCardDialogControlArea from '../../../app/dialog-components/TaskCardDialogControlArea';
import TaskDialogCreateCommentForm from '../../../app/dialog-components/TaskDialogCreateCommentForm';

interface TaskCardDialogProps {
  dashboardId: number;
  columnId: number;
  cardId: number;
  columnName: string;
}

const TaskCardDialog = ({
  dashboardId,
  columnId,
  cardId,
  columnName,
}: TaskCardDialogProps) => {
  const { data, isPending } = useQuery({
    queryKey: ['cards', cardId],
    queryFn: () => getCard(cardId),
  });

  const { showSkeleton, isFadingOut } = useSkeleton(isPending, 1000);

  return (
    <DialogContent
      className="md:grid-cols-[repeat(4, 1fr)_181px] dialog-scrollable-content grid h-[50vh] max-h-[710px] max-w-[327px] grid-cols-4 grid-rows-[min-content_min-content_min-content_1fr_min-content] gap-4 overflow-auto px-4 md:max-h-[766px] md:max-w-[678px] md:gap-6 md:px-8 lg:max-w-[732px] lg:grid-rows-[min-content_auto_1fr_min-content]"
      showCloseButton={false}
    >
      {/** Header 영역 */}
      <DialogHeader className="col-start-1 col-end-5 flex gap-0">
        <TaskCardDialogControlArea
          className="absolute top-5 right-5 flex h-8 gap-x-5"
          cardId={cardId}
          cardData={data}
        />
        {showSkeleton ? (
          <>
            <SkeletonLine
              className="mt-12 h-8 w-4/5 md:mt-0"
              isFadingOut={isFadingOut}
            />
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </>
        ) : (
          <>
            <DialogTitle className="mt-12 text-left md:mt-0">
              <span className="text-taskify-2xl-bold text-taskify-neutral-700">
                {data?.title}
              </span>
            </DialogTitle>
            <DialogDescription className="hidden" />
          </>
        )}
      </DialogHeader>
      {/* CardAuthor 영역 */}
      {showSkeleton ? (
        <SkeletonLine
          className="col-start-1 col-end-5 h-[72px] w-full md:col-start-5 md:col-end-6 md:row-span-3 md:mt-15 md:h-[155px] md:w-[181px]"
          isFadingOut={isFadingOut}
        />
      ) : (
        <CardAuthor
          className="border-taskify-neutral-300 col-start-1 col-end-5 rounded-lg border-1 md:col-start-5 md:col-end-6 md:row-span-3 md:mt-15 md:h-[155px] md:w-[181px]"
          author={data?.assignee?.nickname}
          dueDate={data?.dueDate}
          profileImg={data?.assignee.profileImageUrl}
        />
      )}

      {showSkeleton ? (
        <SkeletonLine
          className="col-start-1 col-end-5 h-[27px] w-3/5"
          isFadingOut={isFadingOut}
        />
      ) : (
        <TaskCardChipStatus
          className="col-start-1 col-end-5 flex flex-wrap gap-2"
          columnName={columnName}
          tags={data?.tags}
        />
      )}

      {/** Contents 영역 */}
      {showSkeleton ? (
        <SkeletonParagraph
          paragraphClassName="w-full col-start-1 col-end-5 gap-[6px] md:gap-[10px]"
          lineClassName="h-[12px] md:h-[14px]"
          lines={8}
          isFadingOut={isFadingOut}
        />
      ) : (
        <div className="col-start-1 col-end-5 gap-4">
          <div className="text-taskify-xs-normal md:text-taskify-md-regular">
            {data?.description}
          </div>
          {data?.imageUrl && (
            <Image
              className="mt-4 mb-2 overflow-hidden rounded-lg"
              src={data?.imageUrl}
              alt="할 일 카드 이미지"
              width={600}
              height={400}
            />
          )}
        </div>
      )}

      {/* Footer 영역 (Comments) */}
      {showSkeleton ? (
        <SkeletonParagraph
          paragraphClassName="col-start-1 col-end-5 gap-4"
          lineClassName="h-[48px]"
          lines={3}
          isFadingOut={isFadingOut}
        />
      ) : (
        <DialogFooter className="col-start-1 col-end-5 flex flex-col gap-4 sm:flex-col md:flex-col">
          <TaskDialogCreateCommentForm
            className="relative flex flex-col justify-between"
            dashboardId={dashboardId}
            columnId={columnId}
            cardId={cardId}
          />
          {data?.id && <Comments cardId={data!.id} />}
        </DialogFooter>
      )}
    </DialogContent>
  );
};

export default TaskCardDialog;
