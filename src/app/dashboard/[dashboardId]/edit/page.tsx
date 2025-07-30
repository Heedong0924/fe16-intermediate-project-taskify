'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import ConfirmDashboardDeletionDialog from '@/components/common/dialog/ConfirmDashboardDeletionDialog';
import Button from '@/components/ui/Buttons';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDashboard } from '@/hooks/useDashboardEdit';
import { useDashboardInvitations } from '@/hooks/useDashboardInvitations';
import { useDialogStore } from '@/stores/useDialogStore';

import DashboardInvitations from './components/DashboardInvitations';
import DashboardMembers from './components/DashboardMembers';
import DashboardUpdate from './components/DashboardUpdate';

export default function DashboardEditPage() {
  const { openDialog } = useDialogStore();

  const { dashboardId } = useParams();

  // ID 체크
  const id = Number(dashboardId);
  if (Number.isNaN(id)) {
    notFound();
  }

  const page = 0;
  const size = 0;

  const { isPending: dashboardPending, isError: dashboardError } =
    useDashboard(id);
  const { isError: invitationError } = useDashboardInvitations(id, {
    page,
    size,
  });

  const isSkeletonVisible =
    dashboardPending || dashboardError || invitationError;

  return (
    <ScrollArea className="overflow-auto">
      <div className="min-h-screen bg-[var(--gray-FAFAFA)] p-[20px]">
        {/* 뒤로가기 */}
        <nav className="mb-[10px] sm:mb-[25px]">
          <Link
            href={`/dashboard/${dashboardId}`}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/arrow-left.svg"
              alt="돌아가기"
              width={20}
              height={20}
            />
            돌아가기
          </Link>
        </nav>

      {/* 대시보드 타이틀, 컬러 수정 */}
      <DashboardUpdate dashboardId={id} isSkeletonVisible={isSkeletonVisible} />

      {/* 구성원 */}
      <DashboardMembers
        dashboardId={id}
        isSkeletonVisible={isSkeletonVisible}
      />

      {/* 초대 내역 */}
      <DashboardInvitations
        dashboardId={id}
        isSkeletonVisible={isSkeletonVisible}
      />

        {/*  대시보드 삭제하기 */}
        <Button
          color="white-black"
          className="btn-removeDash w-full border border-[#D9D9D9] bg-transparent sm:w-[320px]"
          onClick={() => {
            openDialog({
              dialogComponent: (
                <ConfirmDashboardDeletionDialog dashboardId={id} />
              ),
            });
          }}
        >
          대시보드 삭제하기
        </Button>
      </div>
      <ScrollBar className="hidden" />
    </ScrollArea>
  );
}
