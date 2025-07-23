import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useDialogStore } from '@/store/dialogStore';

const CreateColumnDialog = () => {
  const { closeDialog } = useDialogStore();

  const handleSubmit = () => {
    alert('Done!');
    closeDialog();
  };

  const content = (
    <>
      {/* 2. 다이얼로그의 실제 내용 */}
      <DialogContent
        className="max-w-[327px] px-4 md:max-w-[568px] md:px-6"
        showCloseButton={false}
      >
        {/* 헤더 부분: 제목과 설명 */}
        <DialogHeader>
          <DialogTitle className="text-left">
            <span className="text-taskify-2xl-bold text-taskify-neutral-700">
              컬럼 생성
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
              placeholder="새로운 프로젝트"
              type="text"
              className="text-taskify-neutral-700 text-taskify-md-regular border-taskify-neutral-300 col-span-4 rounded-lg border px-4 py-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <Button
            className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 h-auto grow-1 border-1 py-[14px]"
            type="button"
            onClick={closeDialog}
          >
            <span className="text-taskify-lg-semibold text-taskify-neutral-500">
              취소
            </span>
          </Button>
          <Button
            className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 py-[14px]"
            type="submit"
            onClick={handleSubmit}
          >
            <span className="text-taskify-lg-semibold">생성</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );

  return content;
};
export default CreateColumnDialog;
