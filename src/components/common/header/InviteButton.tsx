import { CgAddR } from 'react-icons/cg';

import Button from '@/components/ui/Buttons';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useDialogStore } from '@/stores/useDialogStore';

import SendInvitationDialog from '../dialog/SendInvitationDialog';

const InviteButton = () => {
  // 현재 상세페이지 아이디 담은 초대 모달 열기
  const currentDashboardId = useDashboardStore((s) => s.dashboardId);
  const { openDialog } = useDialogStore();
  if (currentDashboardId == null) return null; // null 또는 undefined 방지
  console.log('currentDashboardId:', currentDashboardId);

  const handleClick = () =>
    openDialog({
      dialogComponent: (
        <SendInvitationDialog dashboardId={currentDashboardId} />
      ),
    });

  return (
    <Button
      type="button"
      color="white-black"
      onClick={handleClick}
      className="dark:bg-taskify-gray-100 dark:hover:bg-taskify-gray-100 h-[30px] w-[73px] px-[12px] py-[6px] text-nowrap md:h-[40px] md:w-[116px] md:px-[16px] md:py-[10px] dark:border-none"
    >
      <div className="dark:text-taskify-gray-700 text-taskify-neutral-500 text-taskify-md-medium md:text-taskify-lg-medium flex items-center gap-2">
        <CgAddR className="hidden md:inline" />
        <p>초대하기</p>
      </div>
    </Button>
  );
};

export default InviteButton;
