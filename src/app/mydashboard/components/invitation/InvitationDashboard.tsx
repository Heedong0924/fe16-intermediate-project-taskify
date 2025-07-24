'use client';

import { useMemo, useState } from 'react';

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

  // data 또는 debouncedSearchTerm이 바뀔 때만 필터 연산 수행 (불필요한 연산 방지)
  const filteredResults = useMemo(() => {
    if (!data?.invitations) return [];
    return data.invitations.filter((item) =>
      item.dashboard.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [data, debouncedSearchTerm]);

  // 로딩중 UI 추가 필요 (없는 경우 빈 목록이 먼저 노출되는 문제 발생)
  if (isPending) {
    return <div>로딩중..</div>;
  }

  return (
    <div className="bg-taskify-neutral-0 flex h-[450px] w-[1022px] flex-col rounded-2xl p-6 px-[32px]">
      <h1 className="text-taskify-2xl-bold text-taskify-neutral-700">
        초대받은 대시보드
      </h1>
      {/* 초대받은 대시보드가 없을 시 안내 페이지, 있을 시 검색 페이지 */}
      {data?.invitations.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <NoInvitation />
        </div>
      ) : (
        <div className="mt-5">
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="h-[290px] overflow-auto">
            <InvitationList
              invitations={filteredResults}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationDashboard;
