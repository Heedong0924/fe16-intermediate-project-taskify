import { UseMutateFunction } from '@tanstack/react-query';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

import Comment from '@/types/Comment.types';

type CreateCommentPayload = {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
};

type UpdateCommentPayload = {
  content: string;
  commentId: number;
};

interface useCommentFormInputProps {
  initialCommentValue?: string;
  type: 'create' | 'update';
  createMutate?: UseMutateFunction<
    Comment,
    Error,
    CreateCommentPayload,
    unknown
  >;
  updateMutate?: UseMutateFunction<
    Comment,
    Error,
    UpdateCommentPayload,
    unknown
  >;
  mutate?: UseMutateFunction<
    Comment,
    Error,
    CreateCommentPayload | UpdateCommentPayload,
    unknown
  >;
  isPending: boolean;
  commentId?: number;
  cardId?: number;
  columnId?: number;
  dashboardId?: number;
}

export const useCommentFormInput = ({
  initialCommentValue = '',
  type,
  createMutate,
  updateMutate,
  isPending,
  commentId,
  cardId,
  columnId,
  dashboardId,
}: useCommentFormInputProps) => {
  const [commentValue, setCommentValue] = useState<string>(initialCommentValue);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isPending) setCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!commentValue) return;
    if (initialCommentValue === commentValue) return;
    if (
      type === 'create' &&
      createMutate &&
      cardId &&
      columnId &&
      dashboardId
    ) {
      createMutate({
        content: commentValue,
        cardId,
        columnId,
        dashboardId,
      });
    } else if (type === 'update' && updateMutate && commentId) {
      updateMutate({
        content: commentValue,
        commentId,
      });
    } else {
      throw new Error('useCommentFormInput Error: Invalid props or type');
    }
  };

  const handleCommentSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCommentSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        handleCommentSubmit();
      }
    }
  };

  return {
    commentValue,
    setCommentValue,
    handleCommentSubmit,
    handleCommentChange,
    handleCommentSubmitClick,
    handleKeyDown,
  };
};
