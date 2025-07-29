import Image from 'next/image';
import { HTMLAttributes } from 'react';

import { DialogClose } from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';
import DetailCard from '@/types/DetailCard';
import closeBtn from 'public/images/icon/closeBtn.svg';

import { KebobMenu } from '../../KebobMenu';
import ConfirmTaskCardDeletionDialog from '../ConfirmTaskCardDeletionDialog';
import TodoEditDialog from '../TodoDialog/TodoEditDialog';

interface TaskCardDialogControlAreaProps
  extends HTMLAttributes<HTMLDivElement> {
  cardId: number;
  cardData: DetailCard | undefined;
}

const TaskCardDialogControlArea = ({
  className,
  cardId,
  cardData,
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
                dialogComponent:
                  // 할 일 카드 수정 다이얼로그 완성 시 붙여줘야함
                  cardData && (
                    <TodoEditDialog
                      columnId={cardData.columnId}
                      mode="edit"
                      cardData={cardData}
                    />
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
