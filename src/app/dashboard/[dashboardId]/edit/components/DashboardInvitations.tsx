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

// 네비게이션 만들어
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
      className="min-h-[385px] !pb-[16px] sm:min-h-[450px] sm:!pb-[20px]"
      title="초대 내역"
      titleRight={
        <div className="flex items-center gap-4">
          <PaginationButton
            page={page}
            size={size}
            totalCount={data?.totalCount}
            onPageChange={setPage}
          />
          <Button
            color="violet-white"
            className="h-[26px] gap-2 !rounded-[4px] px-3 text-[12px] sm:h-[32px] sm:px-4 sm:!text-[14px]"
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
        </div>
      }
    >
      <h2 className="mt-[18px] px-[20px] text-base text-[var(--gray-D9D9D9)] sm:mt-[27px] sm:px-[28px] sm:text-[16px]">
        이메일
      </h2>
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
