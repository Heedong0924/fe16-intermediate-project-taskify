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

  const content = (
    <DialogContent
      className="dialog-scrollable-content h-[50vh] max-h-[710px] max-w-[327px] gap-4 overflow-auto px-4 md:max-w-[568px] md:px-6"
      showCloseButton={false}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      {/** Header 영역 */}
      <DialogHeader className="flex gap-4">
        <TaskCardDialogControlArea
          className="absolute top-5 right-5 flex gap-5"
          cardId={cardId}
        />
        <DialogTitle className="mt-12 text-left">
          <span className="text-taskify-2xl-bold text-taskify-neutral-700">
            {data?.title}
          </span>
        </DialogTitle>
        <CardAuthor
          className="border-taskify-neutral-300 col-span-4 rounded-lg border-1"
          author={data?.assignee.nickname}
          dueDate={data?.dueDate}
        />
        <TaskCardChipStatus
          className="col-span-4 flex flex-wrap gap-2"
          columnName={columnName}
          tags={data?.tags}
        />
      </DialogHeader>

      {/** Contents 영역 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-taskify-xs-normal col-span-4">
          {data?.description}
        </div>
        <div className="col-span-4 mt-4 mb-2">
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
      <DialogFooter className="grid grid-cols-4 gap-4">
        <TaskDialogCreateCommentForm
          className="relative col-span-4 flex flex-col justify-between"
          dashboardId={dashboardId}
          columnId={columnId}
          cardId={cardId}
        />
        {data?.id && <Comments className="col-span-4" cardId={data!.id} />}
      </DialogFooter>
    </DialogContent>
  );

  return content;
};
export default TaskCardDialog;
