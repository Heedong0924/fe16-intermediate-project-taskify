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
import { createDashboard } from '@/lib/api/dashboardService';
import { useDialogStore } from '@/stores/useDialogStore';
import ServerErrorResponse from '@/types/ServerErrorResponse';

import { ColorPickerChip } from '../Chips';
import Input from '../Input';

const CreateDashboardDialog = () => {
  const { closeDialog } = useDialogStore();
  const queryClient = useQueryClient();

  const [createDashboardValue, setCreateDashboardValue] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#7AC555');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: createDashboard,
    onSuccess: () => {
      closeDialog();
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ServerErrorResponse>;
      setErrorMessage(axiosError.response?.data.message);
    },
  });

  const handleCreateDashboardChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateDashboardValue(e.target.value);
    if (errorMessage) setErrorMessage(undefined);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending)
      mutate({ title: createDashboardValue.trim(), color: selectedColor });
  };

  return (
    <DialogContent
      className="max-w-[327px] px-4 md:max-w-[568px] md:gap-7 md:px-6"
      showCloseButton={false}
    >
      <DialogHeader className="gap-0">
        <DialogTitle className="text-left">
          <span className="text-taskify-xl-bold md:text-taskify-2xl-bold text-taskify-neutral-700">
            새로운 대시보드
          </span>
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <form className="flex flex-col gap-8 md:gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            id="title"
            label="이름"
            type="text"
            autoComplete="off"
            placeholder="대시보드 이름을 입력해주세요."
            value={createDashboardValue}
            onChange={handleCreateDashboardChange}
            maxLength={20}
            isError={errorMessage !== undefined}
            errorMessage={errorMessage}
            inputClassName="text-taskify-neutral-700 text-taskify-md-regular md:text-taskify-lg-regular px-4 py-3"
          />
          <div className="mt-2">
            <ColorPickerChip
              size="sm"
              value={selectedColor}
              onChange={setSelectedColor}
            />
          </div>
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

export default CreateDashboardDialog;
