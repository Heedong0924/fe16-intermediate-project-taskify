'use client';

import { useRouter } from 'next/navigation';

import { Dashboard } from '@/types/Dashboard';
import { Member } from '@/types/DashboardMember';

import DashboardHeader from './DashboardHeader';
import MemberAvatars from './MemberAvatars';
import MemberCountText from './MemberCountText';

interface DashboardListItemProps {
  dashboard: Dashboard;
  members: Member[];
}

const DashboardListItem = ({ dashboard, members }: DashboardListItemProps) => {
  const router = useRouter();

  // 카드 개별 구성
  // PC : 헤더 + 멤버아바타 + 멤버카운트, 태블릿 : 헤더 + 호버 시 멤버 아바타, 모바일 : 헤더

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/dashboard/${dashboard.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          router.push(`/dashboard/${dashboard.id}`);
        }
      }}
      className="group relative flex min-h-[58px] w-[290px] cursor-pointer flex-col items-start justify-between gap-2 rounded-lg border p-4 transition hover:shadow-sm md:min-h-[68px] md:w-[275px] md:flex-row lg:min-h-[175px] lg:w-[175px] lg:flex-col"
    >
      <DashboardHeader
        title={dashboard.title}
        color={dashboard.color}
        createdByMe={dashboard.createdByMe}
      />
      <div className="hidden transition-all duration-200 group-hover:opacity-100 md:absolute md:top-5 md:left-44 md:group-hover:block lg:relative lg:top-auto lg:left-auto lg:-mt-5 lg:block">
        <MemberAvatars members={members} />
      </div>
      <div className="hidden lg:mb-2 lg:block">
        <MemberCountText count={members?.length ?? 0} />
      </div>
    </div>
  );
};

export default DashboardListItem;
