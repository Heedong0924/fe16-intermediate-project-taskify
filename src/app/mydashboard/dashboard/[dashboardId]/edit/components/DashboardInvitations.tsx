// import { useState } from 'react';

import Image from 'next/image';
import { useState } from 'react';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import SendInvitationDialog from '@/components/common/dialog/SendInvitationDialog';
import Button from '@/components/ui/Buttons';
import PaginationButton from '@/components/ui/PaginationButton';
import {
  useDashboardInvitations,
  useDeleteInvitation,
} from '@/hooks/useDashboardInvitations';
import { useDialogStore } from '@/stores/useDialogStore';

// 페이지 옮긴 뒤 초대 삭제 하면 전 페이지로 안 넘어가고 현재 페이지에서 초대가 없다고 뜸...
export default function DashboardInvitations({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const { openDialog } = useDialogStore();
  const [page, setPage] = useState(1);
  const size = 5;

  // 초대 목록
  const { data, isPending, isError } = useDashboardInvitations(dashboardId, {
    page,
    size,
  });

  // 초대 삭제
  const deleteMutation = useDeleteInvitation(dashboardId);

  if (isPending) return <p>불러오는 중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <ContentSectionWithAction
      // 16px20px
      className="dashboard-section-action-item4 min-h-[395px] !pb-[16px] sm:min-h-[469px] sm:!pb-[20px]"
      title="초대 내역"
      titleRight={
        <>
          {/* <div className="items-center gap-4"></div> */}
          <PaginationButton
            className="ml-auto"
            page={page}
            size={size}
            totalCount={data?.totalCount}
            onPageChange={setPage}
          />
          {/* direction: column */}
          <Button
            color="violet-white"
            className="col-start-2 row-start-2 h-[26px] gap-2 justify-self-end !rounded-[4px] px-3 text-[12px] sm:col-start-3 sm:row-start-1 sm:h-[32px] sm:px-4 sm:!text-[14px]"
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
          <h2 className="col-start-1 row-start-2 text-base text-[var(--gray-D9D9D9)] sm:text-[16px]">
            이메일
          </h2>
        </>
      }
    >
      <ul className="divide-y">
        {data?.invitations.length ? (
          data.invitations.map((invitation) => (
            <li
              key={invitation.id}
              className="flex items-center justify-between px-[20px] py-[12px] last:pb-0 sm:px-[28px] sm:py-[16px]"
            >
              <span className="text-[14px] sm:text-[16px]">
                {invitation.invitee.email}
              </span>
              <Button
                onClick={() => deleteMutation.mutate(invitation.id)}
                color="white-violet"
                className="btn-one !rounded-[4px] border border-[var(--gray-D9D9D9)] text-[12px] sm:!text-[14px]"
              >
                취소
              </Button>
            </li>
          ))
        ) : (
          <p>보낸 초대가 없습니다.</p>
        )}
      </ul>
    </ContentSectionWithAction>
  );
}
