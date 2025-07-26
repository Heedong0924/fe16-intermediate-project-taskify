'use client';

import AlertDialog from '@/components/common/dialog/AlertDialog';
import ColumnSettingsDialog from '@/components/common/dialog/ColumnSettingsDialog';
import CreateColumnDialog from '@/components/common/dialog/CreateColumnDialog';
import CreateDashboardDialog from '@/components/common/dialog/CreateDashboardDialog';
import SendInvitationDialog from '@/components/common/dialog/SendInvitationDialog';
import TaskCardDialog from '@/components/common/dialog/TaskCardDialog';
import { Button } from '@/components/ui/Button';
import { useDialogStore } from '@/stores/useDialogStore';

const DialogTest = () => {
  const { openDialog } = useDialogStore();

  return (
    <div className="flex flex-col gap-4">
      테스트 중인 DashboardId: 15564
      <Button
        onClick={() => {
          setTimeout(() => {
            openDialog({
              dialogComponent: (
                <AlertDialog
                  description="비밀번호가 일치하지 않습니다"
                  closeBtnText="확인"
                />
              ),
            });
          }, 1000); // 1초뒤 response를 받는 예시
        }}
      >
        글로벌 다이얼로그: 알림 테스트
      </Button>
      <Button
        onClick={() =>
          openDialog({
            dialogComponent: (
              <ColumnSettingsDialog columnId={52576} columnName="기존 컬럼" />
            ),
          })
        }
      >
        글로벌 다이얼로그: 컬럼 관리 테스트 (수정 및 삭제)
      </Button>
      <Button
        onClick={() =>
          openDialog({
            dialogComponent: <CreateColumnDialog dashboardId={15564} />,
          })
        }
      >
        글로벌 다이얼로그: 컬럼 생성 테스트
      </Button>
      <Button
        onClick={() =>
          openDialog({ dialogComponent: <CreateDashboardDialog /> })
        }
      >
        글로벌 다이얼로그: 대쉬보드 생성 테스트
      </Button>
      <Button
        onClick={() =>
          openDialog({
            dialogComponent: <SendInvitationDialog dashboardId={15564} />,
          })
        }
      >
        글로벌 다이얼로그: 초대하기 테스트
      </Button>
      <Button
        onClick={() =>
          openDialog({
            dialogComponent: (
              <TaskCardDialog
                dashboardId={15564}
                columnId={52469}
                columnName="Todo"
                cardId={13404}
              />
            ),
          })
        }
      >
        글로벌 다이얼로그: 할 일 카드 테스트
      </Button>
    </div>
  );
};
export default DialogTest;
