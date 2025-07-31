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
  const dashboardId = 15564;
  const columnId = 52469;
  const cardId = 13429;

  const _myToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTk1NiwidGVhbUlkIjoiMTYtMiIsImlhdCI6MTc1MzI1Mzg3OSwiaXNzIjoic3AtdGFza2lmeSJ9.u4K-XiW2Wix5ARLa8hVxR4H9vohuXqmDB4ED4szEzJE';
  const _otherToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTk0MCwidGVhbUlkIjoiMTYtMiIsImlhdCI6MTc1MzQ0ODY4NCwiaXNzIjoic3AtdGFza2lmeSJ9.GZiKuL24THiyXIqSsVonD8cgd71bXBwWlygnK2cBJqA';

  return (
    <div className="flex flex-col gap-4">
      <div>테스트 중인 DashboardId: {dashboardId}</div>
      <div>테스트 중인 ColumnId: {columnId}</div>
      <div>테스트 중인 CardId: {cardId}</div>
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
              <ColumnSettingsDialog
                columnId={columnId}
                columnName="기존 컬럼"
              />
            ),
          })
        }
      >
        글로벌 다이얼로그: 컬럼 관리 테스트 (수정 및 삭제)
      </Button>
      <Button
        onClick={() =>
          openDialog({
            dialogComponent: <CreateColumnDialog dashboardId={dashboardId} />,
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
            dialogComponent: <SendInvitationDialog dashboardId={dashboardId} />,
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
                dashboardId={dashboardId}
                columnId={columnId}
                columnName="Todo"
                cardId={cardId}
              />
            ),
          })
        }
      >
        글로벌 다이얼로그: 할 일 카드 테스트
      </Button>

      <Button
        onClick={() => {
          openDialog({
            dialogComponent: (
              <TaskCardDialog
                dashboardId={dashboardId}
                columnId={columnId}
                columnName="Todo"
                cardId={cardId}
              />
            ),
          });
          setTimeout(() => {
            openDialog({
              isNewOpen: true,
              dialogComponent: (
                <AlertDialog description="test" closeBtnText="확인" isGoBack />
              ),
            });
          }, 3000);
        }}
      >
        글로벌 다이얼로그: 중첩 다이얼로그 테스트
      </Button>
    </div>
  );
};
export default DialogTest;
