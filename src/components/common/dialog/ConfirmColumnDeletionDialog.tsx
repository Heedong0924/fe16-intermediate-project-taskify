import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/Dialog';
import { deleteColumn } from '@/lib/api/columnService';
import { useDialogStore } from '@/stores/useDialogStore';

import AlertDialog from './AlertDialog';

interface ConfirmColumnDeletionDialogProps {
  columnId: number;
}

const ConfirmColumnDeletionDialog = ({
  columnId,
}: ConfirmColumnDeletionDialogProps) => {
  const { openDialog, closeDialog, goBack } = useDialogStore();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteColumn,
    onSuccess: () => {
      closeDialog();
    },
    onError: (_error) => {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="컬럼 삭제에 실패했습니다."
            closeBtnText="확인"
            isGoBack
          />
        ),
      });
    },
  });

  const handleDeleteClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) mutate(columnId);
  };

  const content = (
    <DialogContent
      className="w-[327px] gap-8 px-4 py-6 md:w-[568px]"
      showCloseButton={false}
    >
      <DialogHeader className="flex">
        <DialogDescription className="text-taskify-lg-medium text-taskify-neutral-700 md:text-taskify-xl-medium text-center">
          컬럼의 모든 카드가 삭제됩니다.
        </DialogDescription>
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
            className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 cursor-pointer py-[14px]"
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

export default ConfirmColumnDeletionDialog;
