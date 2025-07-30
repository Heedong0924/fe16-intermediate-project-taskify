import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { updateColumn } from '@/lib/api/columnService';
import { useDialogStore } from '@/stores/useDialogStore';
import ServerErrorResponse from '@/types/ServerErrorResponse';

import ConfirmColumnDeletionDialog from './ConfirmColumnDeletionDialog';
import Input from '../Input';

interface ColumnSettingsDialogProps {
  columnId: number;
  columnName: string;
}

const ColumnSettingsDialog = ({
  columnId,
  columnName,
}: ColumnSettingsDialogProps) => {
  const [updateColumnValue, setUpdateColumnValue] =
    useState<string>(columnName);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const { openDialog, closeDialog } = useDialogStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
      closeDialog();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ServerErrorResponse>;
      setErrorMessage(axiosError.response?.data.message);
    },
  });

  const handleOpenConfirm = () => {
    openDialog({
      dialogComponent: <ConfirmColumnDeletionDialog columnId={columnId} />,
    });
  };

  const handleUpdateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateColumnValue(e.target.value);
    if (errorMessage) setErrorMessage(undefined);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPending) mutate({ columnId, title: updateColumnValue.trim() });
  };

  return (
    <DialogContent className="max-w-[327px] px-4 md:max-w-[568px] md:gap-7 md:px-6">
      <DialogHeader className="gap-0">
        <DialogTitle className="text-left">
          <span className="text-taskify-xl-bold md:text-taskify-2xl-bold text-taskify-neutral-700">
            컬럼 관리
          </span>
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            id="title"
            label="이름"
            type="text"
            autoComplete="off"
            placeholder="컬럼 이름을 입력해주세요."
            defaultValue={updateColumnValue}
            value={updateColumnValue}
            onChange={handleUpdateChange}
            maxLength={20}
            isError={errorMessage !== undefined}
            errorMessage={errorMessage}
            inputClassName="text-taskify-neutral-700 text-taskify-md-regular md:text-taskify-lg-regular px-4 py-3"
          />
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
  );
};

export default ColumnSettingsDialog;
