import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTMLAttributes, useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { createComment } from '@/lib/api/commentService';
import { useDialogStore } from '@/stores/useDialogStore';

import { useCommentFormInput } from '../../../../hooks/useCommentFormInput';
import AlertDialog from '../AlertDialog';

interface TaskDialogCommentAreaProps extends HTMLAttributes<HTMLDivElement> {
  dashboardId: number;
  columnId: number;
  cardId: number;
}

const TaskDialogCreateCommentForm = ({
  className,
  dashboardId,
  columnId,
  cardId,
}: TaskDialogCommentAreaProps) => {
  const { openDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
    onError: (error) => {
      openDialog({
        dialogComponent: (
          <AlertDialog description={error.message} closeBtnText="확인" />
        ),
      });
    },
  });

  const {
    commentValue,
    setCommentValue,
    handleCommentSubmit,
    handleCommentChange,
    handleCommentSubmitClick,
    handleKeyDown,
  } = useCommentFormInput({
    initialCommentValue: '',
    type: 'create',
    createMutate: mutate,
    isPending,
    cardId,
    columnId,
    dashboardId,
  });

  useEffect(() => {
    if (isSuccess) setCommentValue('');
  }, [isSuccess, setCommentValue]);

  return (
    <div className={className}>
      <p className="text-taskify-md-medium md:text-taskify-lg-medium mb-1">
        댓글
      </p>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          className="border-taskify-neutral-300 text-taskify-xs-normal md:text-taskify-md-regular dialog-scrollable-content w-full resize-none rounded-lg border px-3 py-3"
          placeholder="댓글 작성하기"
          rows={3}
          value={commentValue}
          onChange={handleCommentChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="bg-taskify-neutral-0 hover:bg-taskify-neutral-0 text-taskify-violet-primary border-taskify-neutral-300 absolute right-4 bottom-4 cursor-pointer border"
          type="submit"
          disabled={isPending}
          onClick={handleCommentSubmitClick}
        >
          <span className="text-taskify-xs-medium">입력</span>
        </Button>
      </form>
    </div>
  );
};

export default TaskDialogCreateCommentForm;
