import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  useRef,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
} from 'react';

import { Button } from '@/components/ui/Button';
import {
  deleteComment,
  getComments,
  updateComment,
} from '@/lib/api/commentService';
import { getUserStateFromLocalstorage } from '@/lib/utils/getUserStateFromLocalstorage';
import type CommentType from '@/types/Comment.types';

import { formattedDate } from '../CardAuthor';
import { AvatarProfile } from '../Profile';

interface CommentProps {
  comment: CommentType;
  cardId: number;
}

const Comment = ({ comment, cardId }: CommentProps) => {
  const [currentCommentValue, setCurrentCommentValue] = useState<string>(
    comment.content,
  );
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
    },
    onError: (error) => {
      console.error('댓글 삭제 실패', error.message);
    },
  });

  const { mutate: updateCommentMutate, isPending: isUpdatePending } =
    useMutation({
      mutationFn: updateComment,
      onSuccess: () => {
        setIsUpdateMode((prev) => !prev);
        queryClient.invalidateQueries({ queryKey: ['comments', cardId] });
      },
      onError: (error) => {
        console.error('댓글 수정 실패', error.message);
      },
    });

  const userState = getUserStateFromLocalstorage();

  const linkText =
    'underline underline-offset-2 cursor-pointer text-taskify-xs-normal text-taskify-neutral-400';

  const handleCommentUpdateClick = () => {
    setIsUpdateMode((prev) => !prev);
  };

  const handleCommentDeleteClick = () => {
    if (!isDeletePending) deleteMutate(comment.id);
  };

  const handleCurrentCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    updateCommentMutate({
      content: currentCommentValue,
      commentId: comment.id,
    });
  };

  const handleCommentUpdateSubmitClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCommentSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isUpdatePending && e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault(); // textarea의 기본 줄바꿈 동작 방지
        handleCommentSubmit(); // 폼 제출 함수 호출
      }
    }
  };

  return (
    <div key={comment.id} className="mb-4 flex gap-2">
      <AvatarProfile userName={comment.author.nickname} size="sm" />
      <div className="flex grow-1 flex-col gap-2">
        <div className="flex items-end gap-2">
          <span className="text-taskify-xs-semibold text-taskify-neutral-700">
            {comment.author.nickname}
          </span>
          <span className="text-taskify-xs-normal text-taskify-neutral-400">
            {formattedDate(comment.updatedAt)}
            {comment.createdAt &&
              comment.updatedAt &&
              comment.updatedAt > comment.createdAt &&
              ' (수정됨)'}
          </span>
        </div>
        {isUpdateMode ? (
          <form className="relative">
            <textarea
              className="border-taskify-neutral-300 text-taskify-xs-normal dialog-scrollable-content w-full resize-none rounded-lg border px-3 py-3"
              rows={3}
              value={currentCommentValue}
              onChange={handleCurrentCommentChange}
              onKeyDown={handleKeyDown}
            />

            <Button
              className="bg-taskify-neutral-0 hover:bg-taskify-neutral-0 text-taskify-violet-primary border-taskify-neutral-300 absolute right-4 bottom-4 cursor-pointer border"
              disabled={isUpdatePending}
              type="submit"
              onClick={handleCommentUpdateSubmitClick}
            >
              수정
            </Button>
          </form>
        ) : (
          <div className="text-taskify-xs-normal whitespace-pre-wrap">
            {comment.content}
          </div>
        )}

        {userState !== null && userState.user.id === comment.author.id && (
          <div className="flex gap-2">
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

interface CommentsProps {
  cardId: number;
}

const Comments = ({ cardId }: CommentsProps) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['comments', cardId],
    queryFn: ({ pageParam }) =>
      getComments({ cursorId: pageParam, cardId, size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const observerRef = useRef<HTMLDivElement>(null);
  const allComments = data?.pages.flatMap((page) => page.comments) || [];

  useEffect(() => {
    if (isLoading || isError || !hasNextPage) {
      return undefined;
    }

    const currentElement = observerRef.current;

    if (!currentElement) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError]);

  return (
    <>
      {allComments.length !== 0 &&
        allComments.map((e) => {
          return <Comment key={e.id} comment={e} cardId={cardId} />;
        })}
      {/* Intersection Observer Div */}
      <div className="h-1 w-full" ref={observerRef} />
    </>
  );
};
export default Comments;
