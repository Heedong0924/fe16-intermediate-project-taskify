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
import { createInvitations } from '@/lib/api/dashboardService';
import { useDialogStore } from '@/stores/useDialogStore';

import AlertDialog from './AlertDialog';

interface SendInvitationDialogProps {
  dashboardId: number;
}

const SendInvitationDialog = ({ dashboardId }: SendInvitationDialogProps) => {
  const { openDialog, closeDialog } = useDialogStore();
  const [emailValue, setEmailValue] = useState<string>('');

  const { mutate, isPending } = useMutation({
    mutationFn: createInvitations,
    onSuccess: () => {
      closeDialog();
    },
    onError: (_error) => {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="초대 요청에 실패했습니다."
            closeBtnText="확인"
            isGoBack
          />
        ),
      });
    },
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) mutate({ dashboardId, email: emailValue });
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
              초대하기
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
              이메일
            </label>
            <div className="grid grid-cols-4 items-center gap-4">
              <input
                id="name"
                placeholder="user@example.com"
                type="text"
                value={emailValue}
                onChange={handleEmailChange}
                className="text-taskify-neutral-700 text-taskify-md-regular border-taskify-neutral-300 col-span-4 rounded-lg border px-4 py-3"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-between">
            <DialogClose className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 </span> h-auto grow-1 cursor-pointer rounded-lg border-1 py-[14px]">
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
export default SendInvitationDialog;
