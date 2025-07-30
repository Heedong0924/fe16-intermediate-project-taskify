'use client';

import { useState } from 'react';

import SkeletonLine from '@/components/ui/SkeletonLIne';
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

  // 로딩중 UI 추가
  if (isPending) {
    return (
      <div className="bg-taskify-neutral-0 flex h-[550px] w-[330px] flex-col rounded-2xl p-6 md:h-[450px] md:w-[620px] lg:h-[450px] lg:w-[1022px] lg:px-[32px]">
        {/* h1 초대받은 대시보드 제목 스켈레톤 */}
        <SkeletonLine className="mb-5 h-8 w-40" isFadingOut={false} />

        {/* 검색 InputBox 스켈레톤 */}
        <SkeletonLine
          className="mb-4 h-10 w-full rounded-md"
          isFadingOut={false}
        />

        {/* 테이블 행들 - td만 */}
        <div className="px-4">
          {[
            'skeleton-1',
            'skeleton-2',
            'skeleton-3',
            'skeleton-4',
            'skeleton-5',
          ].map((id) => (
            <div
              key={id}
              className="border-taskify-neutral-200 flex items-center border-b py-3"
            >
              <div className="mr-4 md:w-2/4 lg:w-3/6">
                <div className="h-5 w-3/4 rounded bg-gray-100" />
              </div>
              <div className="mr-4 md:w-1/4 lg:w-1/6">
                <div className="h-5 rounded bg-gray-100" />
              </div>
              <div className="mr-4 hidden lg:block lg:w-1/6">
                <div className="h-5 rounded bg-gray-100" />
              </div>
              <div className="flex gap-2 md:w-1/4 lg:w-1/6">
                <div className="h-8 w-16 rounded bg-gray-100" />
                <div className="h-8 w-16 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-taskify-neutral-0 flex h-[550px] w-[330px] flex-col rounded-2xl p-6 md:h-[450px] md:w-[620px] lg:h-[450px] lg:w-[1022px] lg:px-[32px]">
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
