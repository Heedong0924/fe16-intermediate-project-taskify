import Image from 'next/image';
import { HTMLAttributes } from 'react';

import { DialogClose } from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';
import closeBtn from 'public/images/icon/closeBtn.svg';

import { KebobMenu } from '../../KebobMenu';
import AlertDialog from '../AlertDialog';
import ConfirmTaskCardDeletionDialog from '../ConfirmTaskCardDeletionDialog';

interface TaskCardDialogControlAreaProps
  extends HTMLAttributes<HTMLDivElement> {
  cardId: number;
}

const TaskCardDialogControlArea = ({
  className,
  cardId,
}: TaskCardDialogControlAreaProps) => {
  const { openDialog } = useDialogStore();

  return (
    <div className={className}>
      <KebobMenu
        menuItems={[
          {
            key: 'edit',
            label: '수정하기',
            variant: 'default',
            onSelect: () => {
              openDialog({
                dialogComponent: (
                  // 할 일 카드 수정 다이얼로그 완성 시 붙여줘야함
                  <AlertDialog description="test" closeBtnText="확인" />
                ),
              });
            },
          },
          {
            key: 'delete',
            label: '삭제하기',
            variant: 'default',
            onSelect: () => {
              openDialog({
                isNewOpen: true,
                dialogComponent: (
                  <ConfirmTaskCardDeletionDialog cardId={cardId} />
                ),
              });
            },
          },
        ]}
      />
      <DialogClose>
        <Image
          className="cursor-pointer"
          src={closeBtn}
          alt="다이얼로그 닫기"
        />
      </DialogClose>
    </div>
  );
};

export default TaskCardDialogControlArea;
