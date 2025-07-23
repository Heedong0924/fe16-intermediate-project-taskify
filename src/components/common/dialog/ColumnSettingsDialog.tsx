import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/store/dialogStore';

import ConfirmColumnDeletionDialog from './ConfirmColumnDeletionDialog';

const ColumnSettingsDialog = () => {
  const { openDialog, closeDialog, data } = useDialogStore();

  const handleOpenConfirm = () => {
    openDialog({
      dialogComponent: <ConfirmColumnDeletionDialog />,
      data,
    });
  };

  const handleSubmit = () => {
    alert('Done!');
    closeDialog();
  };

  // 테스트를 위한 런타임 타입 가드
  let displayId: string | number | null = null;
  if (data && (typeof data.id === 'string' || typeof data.id === 'number')) {
    displayId = data.id;
  }

  const content = (
    <>
      {/* 2. 다이얼로그의 실제 내용 */}
      <DialogContent className="max-w-[327px] px-4 md:max-w-[568px] md:px-6">
        {/* 헤더 부분: 제목과 설명 */}
        <DialogHeader>
          <DialogTitle className="text-left">
            <span className="text-taskify-2xl-bold text-taskify-neutral-700">
              컬럼 관리 data: {displayId}
            </span>
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* 본문 내용 (여기에 폼, 텍스트 등을 추가) */}
        <div className="grid gap-4">
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
              placeholder="<--기존 컬럼 이름 데이터를 끌어와야함-->"
              className="text-taskify-neutral-700 text-taskify-md-regular border-taskify-neutral-300 col-span-4 rounded-lg border px-4 py-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <Button
            className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 h-auto grow-1 border-1 py-[14px]"
            type="button"
            onClick={handleOpenConfirm}
          >
            <span className="text-taskify-lg-semibold text-taskify-neutral-500">
              삭제
            </span>
          </Button>
          <Button
            className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 py-[14px]"
            type="submit"
            onClick={handleSubmit}
          >
            <span className="text-taskify-lg-semibold">변경</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );

  return content;
};
export default ColumnSettingsDialog;
