import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTMLAttributes, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { useCommentFormInput } from '@/hooks/useCommentFormInput';
import { updateComment } from '@/lib/api/commentService';
import { useDialogStore } from '@/stores/useDialogStore';

import AlertDialog from '../AlertDialog';

interface TaskDialogUpdateCommentFormProps
  extends HTMLAttributes<HTMLDivElement> {
  cardId: number;
  commentId: number;
  content: string;
  isUpdateMode: boolean;
  toggleUpdateMode: () => void;
}

const TaskDialogUpdateCommentForm = ({
  cardId,
  commentId,
  content,
  isUpdateMode,
  toggleUpdateMode,
}: TaskDialogUpdateCommentFormProps) => {
  const { openDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    mutate: updateMutate,
    isPending: isUpdatePending,
    isSuccess,
  } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toggleUpdateMode();
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
    initialCommentValue: content,
    type: 'update',
    updateMutate,
    isPending: isUpdatePending,
    commentId,
  });

  useEffect(() => {
    if (isSuccess) setCommentValue(content);
  }, [isSuccess, setCommentValue, content]);

  useEffect(() => {
    if (textareaRef.current && isUpdateMode) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length,
      );
    }
  }, [isUpdateMode]);

  return isUpdateMode ? (
    <form className="relative" onSubmit={handleCommentSubmit}>
      <textarea
        className="border-taskify-neutral-300 text-taskify-xs-normal dialog-scrollable-content w-full resize-none rounded-lg border px-3 py-3"
        ref={textareaRef}
        rows={3}
        value={commentValue}
        onChange={handleCommentChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="bg-taskify-neutral-0 hover:bg-taskify-neutral-0 text-taskify-violet-primary border-taskify-neutral-300 absolute right-4 bottom-4 cursor-pointer border"
        disabled={isUpdatePending}
        type="submit"
        onClick={handleCommentSubmitClick}
      >
        수정
      </Button>
    </form>
  ) : (
    <div className="text-taskify-xs-normal whitespace-pre-wrap">{content}</div>
  );
};

export default TaskDialogUpdateCommentForm;
