'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import MemberAvatars from '@/app/(protected)/mydashboard/components/dashboard/MemberAvatars';
import useIsMobile from '@/hooks/useIsMobile';
import { getMyInfo } from '@/lib/api/auth';
import { getDashboardMembers } from '@/lib/api/dashboardMemberService';
import { getDashboardById } from '@/lib/api/dashboardService';
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
  const isOwner = useDashboardStore((s) => s.createdByMe);

  // headerconfig 기본값 override
  const matched = headerConfig.find((entry) => entry.match(pathname));
  const config = {
    ...DEFAULT_CONFIG,
    ...(matched?.config ?? {}),
  };

  const { dashboardId } = useDashboardStore.getState();
  const members = useMemberStore((state) => state.members);

  // 페이지에 따른 타이틀 override 조건문
  let headerTitle = '제목 없음';
  if ('titleFrom' in config) {
    headerTitle = dashboardTitle;
  } else if ('title' in config && typeof config.title === 'string') {
    headerTitle = config.title;
  }

  const userQuery = useQuery({
    queryKey: ['my-info'],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const currentUser = useAuthStore.getState().user;
    if (userQuery.data && currentUser?.id !== userQuery.data.id) {
      useAuthStore.getState().setUser(userQuery.data);
    }
  }, [userQuery.data]);

  const membersQuery = useQuery<{ members: Member[] }>({
    queryKey: ['dashboard-members', dashboardId],
    queryFn: () => getDashboardMembers({ dashboardId }),
    enabled: !!dashboardId,
  });

  const dashboardQuery = useQuery({
    queryKey: ['dashboard', dashboardId],
    queryFn: () => getDashboardById(dashboardId!),
    enabled: !!dashboardId,
  });

  // 멤버 데이터를 스토어에 업데이트
  useEffect(() => {
    if (membersQuery.data?.members) {
      useMemberStore.getState().setMembers(membersQuery.data.members);
    }
  }, [membersQuery.data?.members]);

  // 대시보드 데이터를 스토어에 업데이트
  useEffect(() => {
    if (dashboardQuery.data) {
      useDashboardStore
        .getState()
        .setCreatedByMe(dashboardQuery.data.createdByMe);
      useDashboardStore.getState().setDashboardTitle(dashboardQuery.data.title);
    }
  }, [dashboardQuery.data]);

  const isMobile = useIsMobile();

  return (
    <header className="border-b-taskify-neutral-300 bg-taskify-neutral-0 fixed z-10 flex h-[60px] w-full items-center justify-between border-[1px] md:w-[calc(100%-160px)] lg:w-[calc(100%-300px)]">
      <div className="flex h-full w-full items-center justify-between px-4 md:px-7">
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
          {/* 관리와 초대하기 버튼은 대시보드 생성자만 볼 수 있음 */}
          {config.showManageButton && isOwner && <ManageButton />}
          {config.showInviteButton && isOwner && <InviteButton />}
          {config.showMemberAvatars && !isMobile && (
            <MemberAvatars members={members} type="header" />
          )}
          {/* 구분선 */}
          <div className="bg-taskify-neutral-300 h-8 w-px" />
          {config.showUserAvatar && <UserAvatar />}
        </div>
      </div>
    </header>
  );
};

export default Header;
