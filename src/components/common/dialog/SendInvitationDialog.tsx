import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
import ServerErrorResponse from '@/types/ServerErrorResponse';

import Input from '../Input';

interface SendInvitationDialogProps {
  dashboardId: number;
}

const SendInvitationDialog = ({ dashboardId }: SendInvitationDialogProps) => {
  // queryClient 추가
  const queryClient = useQueryClient();
  const { closeDialog } = useDialogStore();
  const [emailValue, setEmailValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: createInvitations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-invitations', dashboardId],
      });
      closeDialog();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ServerErrorResponse>;
      setErrorMessage(axiosError.response?.data.message);
    },
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    if (errorMessage) setErrorMessage(undefined);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) mutate({ dashboardId, email: emailValue });
  };

  return (
    <DialogContent
      className="max-w-[327px] px-4 md:max-w-[568px] md:gap-7 md:px-6"
      showCloseButton={false}
    >
      <DialogHeader className="gap-0">
        <DialogTitle className="text-left">
          <span className="text-taskify-xl-bold md:text-taskify-2xl-bold text-taskify-neutral-700">
            초대하기
          </span>
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            id="email"
            label="이메일"
            type="text"
            autoComplete="off"
            placeholder="user@example.com"
            value={emailValue}
            onChange={handleEmailChange}
            isError={errorMessage !== undefined}
            errorMessage={errorMessage}
            inputClassName="text-taskify-neutral-700 text-taskify-md-regular md:text-taskify-lg-regular px-4 py-3"
          />
        </div>
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-0 h-auto grow-1 cursor-pointer rounded-lg border-1 px-4 py-[14px]">
            <span className="text-taskify-lg-medium text-neutral-500">
              취소
            </span>
          </DialogClose>
          <Button
            className="bg-taskify-violet-primary hover:bg-taskify-violet-primary h-auto grow-1 cursor-pointer px-4 py-[14px]"
            type="submit"
          >
            <span className="text-taskify-lg-semibold">생성</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default SendInvitationDialog;
