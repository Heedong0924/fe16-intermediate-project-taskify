import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { Invitation } from '@/types/Invitation';

import InvitationListItem from './InvitationListItem';
import NoResult from './Noresult';

type InvitationProps = {
  searchTerm: string;
};

const InvitationList = ({ searchTerm }: InvitationProps) => {
  const observerEl = useRef<HTMLTableRowElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['invitations', searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      const query = new URLSearchParams();
      query.append('size', '10');
      query.append('cursorId', pageParam.toString());
      if (searchTerm) query.append('title', searchTerm);

      const res = await fetch(`/api/invitations?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? null,
  });

  useEffect(() => {
    const currentEl = observerEl.current;
    const io = new IntersectionObserver((entries) => {
      console.log('👀 entries:', entries);
      console.log('👉 isIntersecting:', entries[0].isIntersecting);
      console.log('🧾 hasNextPage:', hasNextPage);
      if (entries[0].isIntersecting && hasNextPage) {
        console.log('📦 fetchNextPage 실행!');
        fetchNextPage();
      }
    });
    console.log('observer 실행됨!');
    if (currentEl) io.observe(currentEl);
    return () => {
      if (currentEl) io.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  const allInvitations =
    data?.pages.flatMap((page) => page.invitations as Invitation[]) ?? [];

  if (!isFetching && allInvitations.length === 0) {
    return <NoResult />;
  }

  return (
    <table className="w-full text-left">
      <thead className="bg-taskify-neutral-0 sticky top-0 z-10">
        <tr>
          <th
            colSpan={4}
            aria-hidden="true"
            className="bg-taskify-neutral-0 sticky h-6 border-none"
          >
            &nbsp;
          </th>
        </tr>
        <tr>
          <th className="text-taskify-lg-regular text-taskify-neutral-400 pl-[76px]">
            이름
          </th>
          <th className="text-taskify-lg-regular text-taskify-neutral-400">
            초대자
          </th>
          <th className="text-taskify-lg-regular text-taskify-neutral-400">
            초대한 시점
          </th>
          <th className="text-taskify-lg-regular text-taskify-neutral-400 pl-[65px]">
            수락 여부
          </th>
        </tr>
      </thead>
      <tbody>
        {allInvitations.map((invitation, i) => {
          const isLast = i === allInvitations.length - 1;
          return (
            <InvitationListItem
              key={invitation.id}
              invitation={invitation}
              searchTerm={searchTerm}
              observerRef={isLast ? observerEl : null}
            />
          );
        })}
        <tr ref={observerEl}>
          <td colSpan={4} aria-hidden="true">
            <div style={{ height: '10px' }} />
          </td>
        </tr>

        {isFetching && (
          <tr>
            <td colSpan={4}>로딩 중...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InvitationList;
