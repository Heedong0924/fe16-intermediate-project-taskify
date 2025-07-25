import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { createColumn } from '@/lib/api/columnService';
import { useDialogStore } from '@/stores/useDialogStore';

interface CreateColumnDialogProps {
  dashboardId: number;
}

const CreateColumnDialog = ({ dashboardId }: CreateColumnDialogProps) => {
  const [createColumnValue, setCreateColumnValue] = useState<string>('');

  const { closeDialog } = useDialogStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createColumn,
    onSuccess: () => {
      closeDialog();
    },
    onError: (error) => {
      console.error('컬럼 생성에 실패했습니다.', error.message);
    },
  });

  const handleCreateColumnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateColumnValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) mutate({ title: createColumnValue, dashboardId });
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
                placeholder="새로운 프로젝트"
                type="text"
                value={createColumnValue}
                onChange={handleCreateColumnChange}
                className="text-taskify-neutral-700 text-taskify-md-regular border-taskify-neutral-300 col-span-4 rounded-lg border px-4 py-3"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-between">
            <DialogClose className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 text-taskify-lg-semibold text-taskify-neutral-500 h-auto grow-1 cursor-pointer rounded-lg border-1 py-[14px]">
              취소
            </DialogClose>
            <Button
              className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 cursor-pointer py-[14px]"
              type="submit"
            >
              <span className="text-taskify-lg-semibold">생성</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );

  return content;
};
export default CreateColumnDialog;
