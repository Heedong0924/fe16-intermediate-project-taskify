'use client';

import { useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetInvitations } from '@/hooks/useGetInvitations';

import InvitationList from './InvitationList';
import NoInvitation from './NoInvitation';
import SearchBox from './SearchBox';

const InvitationDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isPending } = useGetInvitations();

  // 디바운스 시간은 300ms로 사용
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 로딩중 UI 추가 (없는 경우 빈 목록이 먼저 노출되는 문제 발생) - 추가했으나 깜빡임처럼 보이는 점 문제.
  if (isPending) {
    return <Skeleton className="h-[450px] w-[1022px] rounded-2xl" />;
  }

  return (
    <div className="bg-taskify-neutral-0 flex h-[550px] w-[340px] flex-col rounded-2xl p-6 md:h-[450px] md:w-[620px] lg:h-[450px] lg:w-[1022px] lg:px-[32px]">
      <h1 className="text-taskify-2xl-bold text-taskify-neutral-700">
        초대받은 대시보드
      </h1>
      {/* 초대받은 대시보드가 없을 시 안내 페이지, 있을 시 검색 페이지 */}
      {!data || data.invitations.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <NoInvitation />
        </div>
      ) : (
        <div className="mt-5">
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="h-[400px] overflow-auto md:h-[290px]">
            <InvitationList searchTerm={debouncedSearchTerm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationDashboard;
