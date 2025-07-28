'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useDashboard, useDeleteDashboard } from '@/hooks/useDashboardEdit';
import { useDialogStore } from '@/stores/useDialogStore';

interface ConfirmDashboardDeletionDialogProp {
  dashboardId: number;
}

// 대시보드 삭제 다이얼로그!!!
const ConfirmDashboardDeletionDialog = ({
  dashboardId,
}: ConfirmDashboardDeletionDialogProp) => {
  const [isDeleted, setIsDeleted] = useState(false);
  useDashboard(dashboardId, !isDeleted);

  const router = useRouter();
  const { closeDialog, goBack } = useDialogStore();

  const deleteMutation = useDeleteDashboard({
    onSuccess: () => {
      setIsDeleted(true); // 삭제 완료 시 데이터를 더 이상 불러오지 않도록 설정
      router.push('/mydashboard');
      closeDialog();
    },
  });

  const handleDeleteClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteMutation.mutate(dashboardId);
  };

  const content = (
    <DialogContent
      className="max-w-[327px] px-4 md:max-w-[568px] md:gap-7 md:px-6"
      showCloseButton={false}
    >
      <DialogHeader className="mt-4 gap-0">
        <DialogTitle className="text-center">
          <p className="text-taskify-neutral-700 text-taskify-2lg-medium md:text-taskify-xl-medium">
            <b className="text-[var(--violet-5534DA)]">
              대시보드를 삭제하면 복구할 수 없습니다.
            </b>
            <br />
            <span className="text-base">관련 데이터도 함께 사라집니다.</span>
          </p>
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <form onSubmit={handleDeleteClick}>
        <DialogFooter className="flex flex-row justify-between">
          <Button
            className="text-taskify-neutral-500 bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 h-auto grow-1 cursor-pointer border-1 py-[14px]"
            type="button"
            onClick={goBack}
          >
            <span className="text-taskify-lg-semibold">취소</span>
          </Button>
          <Button
            className="bg-taskify-violet-primary h-auto grow-1 cursor-pointer py-[14px] hover:bg-[var(--red-D6173A)]"
            type="submit"
          >
            <span className="text-taskify-lg-semibold">삭제</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  return content;
};

export default ConfirmDashboardDeletionDialog;
