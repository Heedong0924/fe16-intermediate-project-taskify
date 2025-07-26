import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { getCard } from '@/lib/api/cardService';

import CardAuthor from './dialog-components/CardAuthor';
import Comments from './dialog-components/Comments';
import TaskCardChipStatus from './dialog-components/TaskCardChipStatus';
import TaskCardDialogControlArea from './dialog-components/TaskCardDialogControlArea';
import TaskDialogCreateCommentForm from './dialog-components/TaskDialogCreateCommentForm';

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
  const { data } = useQuery({
    queryKey: ['detailCard', cardId],
    queryFn: () => getCard(cardId),
  });

  return (
    <DialogContent
      className="dialog-scrollable-content h-[50vh] max-h-[710px] max-w-[327px] gap-4 overflow-auto px-4 md:max-h-[766px] md:max-w-[678px] md:gap-6 md:px-8 lg:max-w-[732px]"
      showCloseButton={false}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      {/** Header 영역 */}
      <DialogHeader className="col-start-1 col-end-5 flex gap-4 md:gap-6">
        <TaskCardDialogControlArea
          className="absolute top-5 right-5 flex gap-5"
          cardId={cardId}
        />
        <DialogTitle className="mt-12 text-left md:mt-0">
          <span className="text-taskify-2xl-bold text-taskify-neutral-700">
            {data?.title}
          </span>
        </DialogTitle>
      </DialogHeader>
      {/* CardAuthor 영역 */}
      <CardAuthor
        className="border-taskify-neutral-300 col-start-1 col-end-5 rounded-lg border-1 md:col-start-5 md:col-end-7 md:row-span-3 md:mt-15 md:h-[155px] md:w-[181px]"
        author={data?.assignee.nickname}
        dueDate={data?.dueDate}
      />

      <TaskCardChipStatus
        className="col-start-1 col-end-5 flex flex-wrap gap-2"
        columnName={columnName}
        tags={data?.tags}
      />

      {/** Contents 영역 */}
      <div className="col-start-1 col-end-5 gap-4">
        <div className="text-taskify-xs-normal md:text-taskify-md-regular">
          {data?.description}
        </div>
        <div className="mt-4 mb-2">
          {data?.imageUrl && (
            <Image
              className="overflow-hidden rounded-lg"
              src="https://picsum.photos/id/684/600/400"
              alt="test"
              width={600}
              height={400}
            />
          )}
        </div>
      </div>

      {/* Footer 영역 (Comments) */}
      <DialogFooter className="col-start-1 col-end-5 flex flex-col gap-4 sm:flex-col md:flex-col">
        <TaskDialogCreateCommentForm
          className="relative flex flex-col justify-between"
          dashboardId={dashboardId}
          columnId={columnId}
          cardId={cardId}
        />
        {data?.id && <Comments cardId={data!.id} />}
      </DialogFooter>
    </DialogContent>
  );
};

export default TaskCardDialog;
