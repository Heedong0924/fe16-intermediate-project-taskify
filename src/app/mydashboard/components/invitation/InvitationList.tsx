import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState, useMemo } from 'react';

import { getInvitations } from '@/lib/api/invitations';
import { Invitation } from '@/types/Invitation';

import InvitationListItem from './InvitationListItem';
import MobileInvitationList from './MobileInvitationList';
import NoResult from './Noresult';
import { SortOption, SortOrder } from './SortDropdown';

type InvitationProps = {
  searchTerm: string;
  sortOption: SortOption;
  sortOrder: SortOrder;
};

const InvitationList = ({
  searchTerm,
  sortOption,
  sortOrder,
}: InvitationProps) => {
  const observerEl = useRef<HTMLTableRowElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['invitations', searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      return getInvitations({
        size: 10,
        cursorId: pageParam === 0 ? undefined : pageParam,
        title: searchTerm || undefined,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? null,
  });

  useEffect(() => {
    const currentEl = observerEl.current;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (currentEl) io.observe(currentEl);
    return () => {
      if (currentEl) io.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  const allInvitations = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        Array.isArray(page.invitations) ? page.invitations : [page.invitations],
      ) ?? [],
    [data],
  );

  // 정렬 로직
  const sortedInvitations = useMemo(() => {
    const sorted = [...allInvitations].sort((a: Invitation, b: Invitation) => {
      let comparison = 0;

      switch (sortOption) {
        case 'name':
          comparison = a.dashboard.title.localeCompare(b.dashboard.title);
          break;
        case 'inviter':
          comparison = a.inviter.nickname.localeCompare(b.inviter.nickname);
          break;
        case 'date':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [allInvitations, sortOption, sortOrder]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // 초기 실행
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isFetching && allInvitations.length === 0) {
    return <NoResult />;
  }

  return isMobile ? (
    <div>
      {/* 모바일 카드형 UI */}
      {sortedInvitations.map((invitation, index) => (
        <MobileInvitationList
          key={invitation.id}
          invitation={invitation}
          observerRef={
            index === sortedInvitations.length - 1 ? observerEl : undefined
          }
        />
      ))}
    </div>
  ) : (
    <div className="px-4">
      <table className="w-full table-fixed text-left">
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
            <th className="text-taskify-lg-regular text-taskify-neutral-400 md:w-2/4 lg:w-3/6">
              이름
            </th>
            <th className="text-taskify-lg-regular text-taskify-neutral-400 md:w-1/4 lg:w-1/6">
              초대자
            </th>
            <th className="text-taskify-lg-regular text-taskify-neutral-400 hidden lg:table-cell lg:w-1/6">
              초대한 시점
            </th>
            <th className="text-taskify-lg-regular text-taskify-neutral-400 md:w-1/4 lg:w-1/6">
              수락 여부
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedInvitations.map((invitation, i) => {
            const isLast = i === sortedInvitations.length - 1;
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
    </div>
  );
};

export default InvitationList;
