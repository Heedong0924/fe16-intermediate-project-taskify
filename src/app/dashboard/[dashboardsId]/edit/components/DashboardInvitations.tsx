import { useState } from 'react';

import { ContentSectionWithAction } from '@/components/common/ContentSection';
import SendInvitationDialog from '@/components/common/dialog/SendInvitationDialog';
import Button from '@/components/ui/Buttons';
import {
  useInviteDashboardUser,
  useDashboardInvitations,
  useDeleteInvitation,
} from '@/hooks/useDashboardInvitations';
import { useDialogStore } from '@/stores/useDialogStore';

// 네비게이션 만들어
export default function DashboardInvitations({
  dashboardsId,
}: {
  dashboardsId: number;
}) {
  const { openDialog } = useDialogStore();

  // 초대 함
  const [email, setEmail] = useState('');
  const { mutate: inviteUser, isPending } =
    useInviteDashboardUser(dashboardsId);

  // 초대 목록
  const {
    data: invitationsDate,
    isPending: invitationsLoading,
    isError: invitationsError,
  } = useDashboardInvitations(dashboardsId);

  // 초대 삭제
  const deleteMutation = useDeleteInvitation(dashboardsId);
  // deleteMutation.mutate(invitation.id);
  // deleteMutation.isPending
  // deleteMutation.isError

  const handleInvite = () => {
    if (!email) return;

    // 이미 초대한 이메일
    // const alreadyInvited = invitationsDate?.invitations.some(
    //   (invitation) => invitation.invitee.email === email,
    // );
    // if (alreadyInvited) {
    //   alert('이미 초대한 이메일임');
    //   return;
    // }

    // 고쳐
    const alreadyAcceptedMember = invitationsDate?.invitations.some(
      (invitation) =>
        invitation.invitee.email === email && invitation.inviteAccepted,
    );

    if (alreadyAcceptedMember) {
      alert('이미 멤버임');
      return;
    }

    // 나 자신일 때 오류 체크
    // const myEmail = session?.user?.email;
    // if (email === myEmail) {
    //   alert('자기 자신은 초대할 수 없습니다.');
    //   return;
    // }

    inviteUser(email);
    setEmail('');
  };

  if (invitationsLoading) return <p>불러오는 중...</p>;
  if (invitationsError) return <p>에러 발생!</p>;

  return (
    <ContentSectionWithAction
      title="초대 내역"
      titleRight={
        <>
          <Button
            className=""
            onClick={() =>
              openDialog({
                dialogComponent: (
                  <SendInvitationDialog dashboardId={dashboardsId} />
                ),
              })
            }
          >
            초대하기
          </Button>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border p-2"
            placeholder="이메일 입력"
          />
          <Button onClick={handleInvite} disabled={isPending}>
            임시
          </Button>
        </>
      }
    >
      {invitationsDate?.invitations.length ? (
        invitationsDate.invitations.map((invitation) => (
          <div key={invitation.id} className="flex gap-2.5">
            <p>{invitation.invitee.email}</p>
            {/* <p>상태: {invitation.inviteAccepted ? '수락됨' : '대기 중'}</p> */}
            <q>{new Date(invitation.createdAt).toLocaleDateString()}</q>
            <Button
              onClick={() => deleteMutation.mutate(invitation.id)}
              disabled={deleteMutation.isPending}
              className="text-sm text-red-500 hover:underline"
            >
              삭제
            </Button>
          </div>
        ))
      ) : (
        <p>보낸 초대가 없습니다.</p>
      )}
    </ContentSectionWithAction>
  );
}
