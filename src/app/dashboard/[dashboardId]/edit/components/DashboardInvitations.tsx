// import { useState } from 'react';

import Image from 'next/image';
import { useState } from 'react';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import SendInvitationDialog from '@/components/common/dialog/SendInvitationDialog';
import Button from '@/components/ui/Buttons';
import PaginationButton from '@/components/ui/PaginationButton';
import SkeletonLine from '@/components/ui/SkeletonLIne';
import { useDashboard } from '@/hooks/useDashboardEdit';
import {
  useDashboardInvitations,
  useDeleteInvitation,
} from '@/hooks/useDashboardInvitations';
import { useSkeleton } from '@/hooks/useSkeleton';
import { useDialogStore } from '@/stores/useDialogStore';

export default function DashboardInvitations({
  dashboardId,
  isSkeletonVisible,
}: {
  dashboardId: number;
  isSkeletonVisible: boolean;
}) {
  const { openDialog } = useDialogStore();
  const [page, setPage] = useState(1);
  const size = 5;

  // 초대 목록
  const { data } = useDashboardInvitations(dashboardId, {
    page,
    size,
  });

  const { data: dashboardData } = useDashboard(dashboardId);
  const { showSkeleton, isFadingOut } = useSkeleton(isSkeletonVisible, 1200);
  const shouldShowSkeleton = showSkeleton || !dashboardData;

  // 초대 삭제
  const deleteMutation = useDeleteInvitation(dashboardId);

  return (
    <ContentSectionWithAction
      className="dashboard-section-action-item !pb-[16px] md:!pb-[20px]"
      title={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-[100%]" isFadingOut={isFadingOut} />
        ) : (
          '초대 내역'
        )
      }
      titleRight={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-[135px]" isFadingOut={isFadingOut} />
        ) : (
          <>
            <PaginationButton
              className="ml-auto"
              page={page}
              size={size}
              totalCount={data?.totalCount}
              onPageChange={setPage}
            />
            <Button
              color="violet-white"
              className="col-start-2 row-start-2 h-[26px] gap-2 justify-self-end !rounded-[4px] px-3 text-[12px] md:col-start-3 md:row-start-1 md:h-[32px] md:px-4 md:!text-[14px]"
              onClick={() =>
                openDialog({
                  dialogComponent: (
                    <SendInvitationDialog dashboardId={dashboardId} />
                  ),
                })
              }
            >
              <Image
                src="/images/icon/addBox-white.svg"
                alt="초대하기"
                height={16}
                width={16}
              />
              <span>초대하기</span>
            </Button>
            <h2 className="col-start-1 row-start-2 text-base text-[var(--gray-D9D9D9)] md:text-[16px]">
              이메일
            </h2>
          </>
        )
      }
    >
      <div className="h-[273px] md:h-[310px]">
        {shouldShowSkeleton ? (
          <div className="h-full px-[20px] md:px-[28px]">
            <SkeletonLine className="h-full w-full" isFadingOut={isFadingOut} />
          </div>
        ) : (
          <div className="h-full">
            {data?.invitations.length ? (
              <ul className="divide-y">
                {data.invitations.map((invitation) => (
                  <li
                    key={invitation.id}
                    className="flex items-center justify-between px-[20px] py-[12px] last:pb-0 md:px-[28px] md:py-[16px]"
                  >
                    <span className="text-[14px] md:text-[16px]">
                      {invitation.invitee.email}
                    </span>
                    <Button
                      onClick={() => deleteMutation.mutate(invitation.id)}
                      color="white-violet"
                      className="btn-one !rounded-[4px] border border-[var(--gray-D9D9D9)] text-[12px] md:!text-[14px]"
                    >
                      취소
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <Image
                  src="/images/envelope.png"
                  alt="초대 없음"
                  width={87.5}
                  height={75}
                />
                <p className="text-taskify-neutral-300">
                  아직 초대한 대시보드가 없어요
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ContentSectionWithAction>
  );
}
