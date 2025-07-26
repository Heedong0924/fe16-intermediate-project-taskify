import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect, HTMLAttributes } from 'react';

import { getComments } from '@/lib/api/commentService';

import Comment from './Comment';

interface CommentsProps extends HTMLAttributes<HTMLDivElement> {
  cardId: number;
}

const Comments = ({ className, cardId }: CommentsProps) => {
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
    if (isLoading || isError || !hasNextPage) return undefined;

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
      if (currentElement) observer.unobserve(currentElement);
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError]);

  return (
    <div className={className}>
      {allComments.length !== 0 &&
        allComments.map((e) => {
          return (
            <Comment
              className="mb-4 flex gap-2"
              key={e.id}
              comment={e}
              cardId={cardId}
            />
          );
        })}
      {/* Intersection Observer Div for Infinite Scroll */}
      <div className="h-1 w-full" ref={observerRef} />
    </div>
  );
};
export default Comments;
