import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/store/dialogStore';

const ConfirmColumnDeletionDialog = () => {
  const { closeDialog, goBack, data } = useDialogStore();

  // 테스트를 위한 런타임 타입 가드
  let displayId: string | number | null = null;
  if (data && (typeof data.id === 'string' || typeof data.id === 'number')) {
    displayId = data.id;
  }

  const content = (
    <DialogContent
      className="w-[327px] gap-8 px-4 py-6 md:w-[568px]"
      showCloseButton={false}
    >
      <DialogHeader className="flex">
        <DialogDescription className="text-center">
          <span className="text-taskify-lg-medium text-taskify-neutral-700 md:text-taskify-xl-medium">
            컬럼의 모든 카드가 삭제됩니다. data: {displayId}
          </span>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-row justify-between">
        <Button
          className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 h-auto grow-1 border-1 py-[14px]"
          onClick={goBack}
        >
          <span className="text-taskify-lg-semibold text-taskify-neutral-500">
            취소
          </span>
        </Button>
        <Button
          className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 py-[14px]"
          onClick={closeDialog}
        >
          <span className="text-taskify-lg-semibold">삭제</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return content;
};

export default ConfirmColumnDeletionDialog;
