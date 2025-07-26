import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { getCard } from '@/lib/api/cardService';
import { createComment } from '@/lib/api/commentService';
import { useDialogStore } from '@/stores/useDialogStore';
import closeBtn from 'public/images/icon/closeBtn.svg';

import CardAuthor from '../CardAuthor';
import { StatusChip, TagChip } from '../Chips';
import Comments from './Comments';
import { KebobMenu } from '../KebobMenu';
import ConfirmTaskCardDeletionDialog from './ConfirmTaskCardDeletionDialog';
import TodoEditDialog from './TodoDialog/TodoEditDialog';

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
  const queryClient = useQueryClient();
  const { openDialog } = useDialogStore();

  const [createCommentValue, setCreateCommentValue] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['detailCard', cardId],
    queryFn: () => getCard(cardId),
  });

  const { mutate: createCommentMutate, isPending: isCreateCommentPending } =
    useMutation({
      mutationFn: createComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
        setCreateCommentValue('');
      },
      onError: (error) => {
        console.error('댓글 생성 실패', error.message);
      },
    });

  const handleCreateCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCreateCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    createCommentMutate({
      content: createCommentValue,
      cardId,
      columnId,
      dashboardId,
    });
  };

  const handleCommentSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCommentSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isCreateCommentPending && e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault(); // textarea의 기본 줄바꿈 동작 방지
        handleCommentSubmit(); // 폼 제출 함수 호출
      }
    }
  };

  const content = (
    <DialogContent
      className="dialog-scrollable-content h-[50vh] max-h-[710px] max-w-[327px] gap-2 overflow-auto px-4 md:max-w-[568px] md:px-6"
      showCloseButton={false}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      <DialogHeader className="block">
        <div className="absolute top-5 right-5 flex gap-5">
          <KebobMenu
            menuItems={[
              {
                key: 'edit',
                label: '수정하기',
                variant: 'default',
                onSelect: () => {
                  openDialog({
                    dialogComponent: (
                      <TodoEditDialog
                        columnId={columnId}
                        cardData={data}
                        mode="edit"
                      />
                    ),
                  });
                },
              },
              {
                key: 'delete',
                label: '삭제하기',
                variant: 'default',
                onSelect: () => {
                  openDialog({
                    dialogComponent: (
                      <ConfirmTaskCardDeletionDialog cardId={cardId} />
                    ),
                  });
                },
              },
            ]}
          />
          <DialogClose>
            <Image
              className="cursor-pointer"
              src={closeBtn}
              alt="다이얼로그 닫기"
            />
          </DialogClose>
        </div>
        <DialogTitle className="mt-8 text-left">
          <span className="text-taskify-2xl-bold text-taskify-neutral-700">
            {data?.title}
          </span>
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-4 gap-4">
        <CardAuthor
          className="border-taskify-neutral-300 d col-span-4 rounded-lg border-1"
          author={data?.assignee.nickname}
          dueDate={data?.dueDate}
        />
        <div className="col-start-1 col-end-5 flex gap-2">
          <StatusChip size="sm">{columnName}</StatusChip>
          {data?.tags && <span className="text-taskify-neutral-300">|</span>}
          {data?.tags.map((e) => (
            <TagChip key={e} size="sm">
              {e}
            </TagChip>
          ))}
        </div>
        <div className="text-taskify-xs-normal col-start-1 col-end-5">
          {data?.description}
        </div>
        <div className="col-start-1 col-end-5 mt-4 mb-2">
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
        <div className="relative col-start-1 col-end-5 flex flex-col justify-between">
          <p className="text-taskify-md-medium mb-1">댓글</p>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="border-taskify-neutral-300 text-taskify-xs-normal dialog-scrollable-content w-full resize-none rounded-lg border px-3 py-3"
              placeholder="댓글 작성하기"
              rows={3}
              value={createCommentValue}
              onChange={handleCreateCommentChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              className="bg-taskify-neutral-0 hover:bg-taskify-neutral-0 text-taskify-violet-primary border-taskify-neutral-300 absolute right-4 bottom-4 cursor-pointer border"
              type="submit"
              disabled={isCreateCommentPending}
              onClick={handleCommentSubmitClick}
            >
              입력
            </Button>
          </form>
        </div>
        <div className="col-start-1 col-end-5">
          {data?.id && <Comments cardId={data!.id} />}
        </div>
      </div>
    </DialogContent>
  );

  return content;
};
export default TaskCardDialog;
