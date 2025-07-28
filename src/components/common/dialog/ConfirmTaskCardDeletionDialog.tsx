import { useMutation } from '@tanstack/react-query';
import { FormEvent } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { deleteCard } from '@/lib/api/cardService';
import { useDialogStore } from '@/stores/useDialogStore';

import AlertDialog from './AlertDialog';

interface ConfirmColumnDeletionDialogProps {
  cardId: number;
}

const ConfirmTaskCardDeletionDialog = ({
  cardId,
}: ConfirmColumnDeletionDialogProps) => {
  const { openDialog, closeDialog, goBack } = useDialogStore();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      closeDialog();
    },
    onError: (_error) => {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="카드 삭제에 실패했습니다."
            closeBtnText="확인"
            isGoBack
          />
        ),
      });
    },
  });

  const handleDeleteClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) mutate(cardId);
  };

  const content = (
    <DialogContent
      className="max-w-[300px] px-4 sm:max-w-[460px] md:max-w-[568px] md:gap-7 md:px-6"
      showCloseButton={false}
    >
      <DialogHeader className="gap-0">
        <DialogTitle className="text-center">
          <span className="text-taskify-neutral-700 text-taskify-2lg-medium md:text-taskify-xl-medium">
            정말 삭제하시겠습니까?
          </span>
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

export default ConfirmTaskCardDeletionDialog;
