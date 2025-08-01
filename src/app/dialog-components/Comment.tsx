import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTMLAttributes, useState } from 'react';

import { deleteComment } from '@/lib/api/commentService';
import { formattedDate } from '@/lib/utils/fotmattedDate';
import { getUserStateFromLocalstorage } from '@/lib/utils/getUserStateFromLocalstorage';
import { useDialogStore } from '@/stores/useDialogStore';
import CommentType from '@/types/Comment.types';

import TaskDialogUpdateCommentForm from './TaskDialogUpdateCommentForm';
import AlertDialog from '../../components/common/dialog/AlertDialog';
import { AvatarProfile } from '../../components/common/Profile';

interface CommentProps extends HTMLAttributes<HTMLDivElement> {
  comment: CommentType;
  cardId: number;
}

const Comment = ({ className, comment, cardId }: CommentProps) => {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const { openDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const userState = getUserStateFromLocalstorage();

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: deleteComment,
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

  const linkText =
    'underline underline-offset-2 cursor-pointer text-taskify-xs-normal text-[10px] md:text-taskify-xs-normal text-taskify-neutral-400';

  const handleCommentUpdateClick = () => {
    setIsUpdateMode((prev) => !prev);
  };

  const handleCommentDeleteClick = () => {
    if (!isDeletePending) deleteMutate(comment.id);
  };

  const toggleUpdateMode = () => {
    setIsUpdateMode((prev) => !prev);
  };

  return (
    <div className={className}>
      <AvatarProfile
        userName={comment.author.nickname}
        size="sm"
        profileImg={comment.author.profileImageUrl}
      />
      <div className="flex grow-1 flex-col gap-2">
        <div className="flex items-end gap-2">
          <span className="text-taskify-xs-semibold md:text-taskify-md-semibold text-taskify-neutral-700">
            {comment.author.nickname}
          </span>
          <span className="text-taskify-xs-normal md:text-taskify-xs-normal text-taskify-neutral-400 text-[10px]">
            {formattedDate(comment.updatedAt)}
            {comment.createdAt &&
              comment.updatedAt &&
              comment.updatedAt > comment.createdAt &&
              ' (수정됨)'}
          </span>
        </div>
        <TaskDialogUpdateCommentForm
          cardId={cardId}
          commentId={comment.id}
          content={comment.content}
          isUpdateMode={isUpdateMode}
          toggleUpdateMode={toggleUpdateMode}
        />
        {userState !== null && userState.user.id === comment.author.id && (
          <div className="mt-[-8px] flex gap-2">
            <button
              className={linkText}
              type="button"
              onClick={handleCommentUpdateClick}
            >
              {isUpdateMode ? '취소' : '수정'}
            </button>
            <button
              className={linkText}
              type="button"
              disabled={isDeletePending}
              onClick={handleCommentDeleteClick}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
