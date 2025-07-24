import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';

import ConfirmColumnDeletionDialog from './ConfirmColumnDeletionDialog';

interface ColumnSettingsDialogProps {
  columnId: number;
  columnName: string;
}

const ColumnSettingsDialog = ({
  columnId,
  columnName,
}: ColumnSettingsDialogProps) => {
  const { openDialog, closeDialog } = useDialogStore();

  const handleOpenConfirm = () => {
    openDialog({
      dialogComponent: <ConfirmColumnDeletionDialog columnId={columnId} />,
    });
  };

  const handleSubmit = () => {
    alert('Done!');
    closeDialog();
  };

  const content = (
    <>
      {/* 2. 다이얼로그의 실제 내용 */}
      <DialogContent className="max-w-[327px] px-4 md:max-w-[568px] md:px-6">
        {/* 헤더 부분: 제목과 설명 */}
        <DialogHeader>
          <DialogTitle className="text-left">
            <span className="text-taskify-2xl-bold text-taskify-neutral-700">
              컬럼 관리
            </span>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* 본문 내용 (여기에 폼, 텍스트 등을 추가) */}
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="text-taskify-lg-medium text-taskify-neutral-700 text-left"
            >
              이름
            </label>
            <div className="grid grid-cols-4 items-center gap-4">
              <input
                id="name"
                type="text"
                defaultValue={columnName}
                className="text-taskify-neutral-700 text-taskify-md-regular border-taskify-neutral-300 col-span-4 rounded-lg border px-4 py-3"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-between">
            <Button
              className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 h-auto grow-1 cursor-pointer border-1 py-[14px]"
              type="button"
              onClick={handleOpenConfirm}
            >
              <span className="text-taskify-lg-semibold text-taskify-neutral-500">
                삭제
              </span>
            </Button>
            <Button
              className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 cursor-pointer py-[14px]"
              type="submit"
            >
              <span className="text-taskify-lg-semibold">변경</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );

  return content;
};
export default ColumnSettingsDialog;
