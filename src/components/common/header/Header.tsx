'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import MemberAvatars from '@/app/mydashboard/components/dashboard/MemberAvatars';
import { getMyInfo } from '@/lib/api/auth';
import { getDashboardMembers } from '@/lib/api/dashboardMemberService';
import { headerConfig } from '@/lib/constants/headerConfig';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useMemberStore } from '@/stores/useMemberStore';
import { Member } from '@/types/DashboardMember';

import InviteButton from './InviteButton';
import ManageButton from './ManageButton';
import UserAvatar from './UserAvatar';

const DEFAULT_CONFIG = {
  showUserAvatar: true,
  showMemberAvatars: false,
  showInviteButton: false,
  showManageButton: false,
};

const Header = () => {
  // pathname에 따라 headerconfig 조건 분기
  const pathname = usePathname();
  const dashboardTitle = useDashboardStore((s) => s.dashboardTitle);

  // headerconfig 기본값 override
  const matched = headerConfig.find((entry) => entry.match(pathname));
  const config = {
    ...DEFAULT_CONFIG,
    ...(matched?.config ?? {}),
  };

  const { dashboardId } = useDashboardStore.getState();

  // 페이지에 따른 타이틀 override 조건문
  let headerTitle = '제목 없음';
  if ('titleFrom' in config) {
    headerTitle = dashboardTitle;
  } else if ('title' in config && typeof config.title === 'string') {
    headerTitle = config.title;
  }

  // 유저 정보, 멤버 정보 (React Query)
  useQuery({
    queryKey: ['my-info'],
    queryFn: getMyInfo,
    select: (data) => {
      console.log('my-info 쿼리 결과:', data);
      useAuthStore.getState().setUser(data);
      return data;
    },
  });

  useQuery<{ members: Member[] }>({
    queryKey: ['dashboard-members', dashboardId],
    queryFn: () => getDashboardMembers({ dashboardId }),
    enabled: !!dashboardId,
    select: (data) => {
      console.log('dashboard-members', data);
      useMemberStore.getState().setMembers(data.members);
      return data;
    },
  });

  return (
    <header className="border-b-taskify-neutral-300 bg-taskify-neutral-0 fixed z-10 flex h-[60px] w-full items-center justify-between border-[1px]">
      {/* xl로 우선 지정 -> lg로 논의 후 조건 수정해야함. */}
      <div className="flex h-full w-full items-center justify-between px-4 md:ml-[160px] md:px-7 xl:ml-[300px]">
        <div className="flex gap-2">
          {/* 모바일에서만 로고 보이기 */}
          <div className="md:hidden">
            <Link href="/">
              <Image
                src="/images/LogoImage.svg"
                alt="logo"
                width={23}
                height={25}
              />
            </Link>
          </div>

          {/* 페이지 타이틀 */}
          <h1 className="text-taskify-lg-bold lg:text-taskify-xl-bold text-taskify-neutral-700">
            {headerTitle}
          </h1>
        </div>
        {/* 버튼 요소 */}
        <div className="flex items-center gap-2">
          {config.showManageButton && <ManageButton />}
          {config.showInviteButton && <InviteButton />}
          {/* config.showMemberAvatars && <MemberAvatars /> 임시로 주석처리 해두었습니다. */}
          {/* 구분선 */}
          <div className="bg-taskify-neutral-300 h-8 w-px" />
          {config.showUserAvatar && <UserAvatar />}
        </div>
      </div>
    </header>
  );
};

export default Header;
