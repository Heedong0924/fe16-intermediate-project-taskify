'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import React, { useCallback, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { TagInput } from '@/components/common/dialog/TodoDialog/TagInput';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import UploadImageButton from '@/components/common/UploadImageButton';
import { Button } from '@/components/ui/Button';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/Dialog';
import { createCard, updateCard } from '@/lib/api/cardService';
import { cardImageUpload } from '@/lib/api/columnService';
import { mapCardToForm } from '@/lib/utils/cardMapper';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useDialogStore } from '@/stores/useDialogStore';
import DetailCard from '@/types/DetailCard';
import ServerErrorResponse from '@/types/ServerErrorResponse';
import { TodoFormData } from '@/types/TodoFormData';

import { ColumnSelector } from './ColumnSelector';
import { UserSelector } from './UserSelector';
import AlertDialog from '../AlertDialog';
/**
 * 할 일 생성 및 수정 모달 컴포넌트
 * @returns {JSX.Element} 할 일 수정 모달
 */

// TodoEditDialogProps 인터페이스 정의
interface TodoEditDialogProps {
  columnId: number; // 선택된 열 ID
  cardData?: DetailCard; // 카드 데이터 (수정 모드에서 사용)
  mode: 'edit' | 'create'; // 'edit' 또는 'create' 모드
}

const TodoEditDialog = ({ columnId, cardData, mode }: TodoEditDialogProps) => {
  const { openDialog, goBack } = useDialogStore();
  const { dashboardId } = useDashboardStore();

  // 폼 데이터를 관리
  const defaultVals = useMemo<TodoFormData>(
    () =>
      cardData
        ? mapCardToForm(cardData)
        : {
            columnId,
            assigneeUserId: undefined,
            title: '',
            description: '',
            dueDate: '',
            tags: [],
            imageUrl: '',
          },
    [cardData, columnId],
  );
  const {
    reset,
    control,
    setFocus,
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting, isValid },
  } = useForm<TodoFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultVals,
  });

  // 스타일 변수
  const editModeClass = mode === 'edit' ? 'md:grid-cols-2' : '';

  /* 뮤테이션 정의 */
  // 이미지 업로드 뮤테이션
  const uploadMutation = useMutation<string, Error, File>({
    mutationFn: (file) => cardImageUpload(columnId, file),
  });

  // 카드 생성 뮤테이션
  const { mutate: createCardMutation, isPending: isCreating } = useMutation<
    DetailCard,
    Error,
    TodoFormData
  >({
    mutationFn: (data) => createCard(data),
    onSuccess: (data) => {
      console.log('카드 생성 성공:', data);
      goBack();
    },
    onError: (error) => {
      console.error('카드 생성 실패:', error);
      const axiosError = error as AxiosError<ServerErrorResponse>;
      openDialog({
        isNewOpen: true,
        dialogComponent: (
          <AlertDialog
            description={axiosError.response?.data.message || '알 수 없는 에러'}
            closeBtnText="확인"
            isGoBack
          />
        ),
      });
    },
  });
  // 카드 수정 뮤테이션
  const { mutate: updateCardMutation, isPending: isUpdating } = useMutation<
    DetailCard,
    Error,
    { cardId: number; data: TodoFormData }
  >({
    mutationFn: ({ cardId, data }) => {
      return updateCard(cardId, data);
    },
    onSuccess: (data) => {
      console.log('카드 수정 성공:', data);
    },
    onError: (error) => {
      reset(defaultVals);
      console.error('카드 수정 실패:', error);
    },
  });

  // 핸들러
  const handleUpload = useCallback(
    (file: File): Promise<string> => {
      return uploadMutation.mutateAsync(file);
    },
    [uploadMutation],
  );
  const handleUndoClick = () => {
    goBack();
  };

  const onSubmit = (data: TodoFormData) => {
    const payload = {
      ...data,
      dashboardId,
    };

    // 빈 문자열이면 해당 필드를 삭제
    if (!data.dueDate?.trim()) {
      delete payload.dueDate;
    }

    if (!data.imageUrl?.trim()) {
      delete payload.imageUrl;
    }

    if (mode === 'create') {
      // 생성 모드에서 새로운 할 일 생성
      console.log('Create Submit data:', payload);
      createCardMutation(payload);
    } else {
      // 수정 모드에서 기존 할 일 수정
      updateCardMutation({
        cardId: cardData?.id || 0, // cardData가 없을 경우 0으로 설정
        data: payload,
      });
    }
  };

  // 디버깅용 콘솔 로그
  useEffect(() => {
    console.log('defaultVals', defaultVals);
  }, []);

  const loading = isCreating || isUpdating;
  const content = (
    <DialogContent
      className="dialog-scrollable-content"
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        setFocus('title'); // 모달 열릴 때 제목 입력 필드에 포커스
      }}
      showCloseButton={false}
    >
      <DialogHeader>
        <DialogTitle className="text-taskify-neutral-800 text-xl font-bold">
          {mode === 'edit' ? '할 일 수정' : '할 일 생성'}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription />
      <form className="text-taskify-neutral-800 flex max-h-[70vh] flex-col gap-8 overflow-auto p-3">
        <div className={twMerge('grid grid-cols-1 gap-8', editModeClass)}>
          {/* 상태 선택 셀렉터 (생성 모드에서는 없음) */}
          {mode === 'edit' && (
            <Controller
              name="columnId"
              control={control}
              defaultValue={defaultVals.columnId}
              render={({ field }) => (
                <ColumnSelector
                  columnId={field.value}
                  onChange={field.onChange}
                  className="flex flex-col gap-2 md:gap-[10px]"
                />
              )}
            />
          )}
          {/* 담당자 선택 셀렉터 */}
          <Controller
            name="assigneeUserId"
            control={control}
            defaultValue={defaultVals.assigneeUserId}
            render={({ field }) => (
              <UserSelector
                assigneeUserId={field.value}
                onChange={field.onChange}
                placeholder="담당자를 선택하세요"
                className="flex flex-col gap-2 md:gap-[10px]"
              />
            )}
          />
        </div>

        {/* 제목 입력 */}
        <Input
          label="제목"
          isHightLight
          type="text"
          isSuccess={dirtyFields.title && !errors.title}
          isError={!!errors.title}
          errorMessage={errors.title?.message}
          placeholder="할 일 제목을 입력하세요"
          {...register('title', {
            required: '제목은 필수 입력입니다.',
            maxLength: {
              value: 20,
              message: '제목은 최대 20자까지 입력할 수 있습니다.',
            },
          })}
        />

        {/* 설명 입력 */}
        <div className="flex flex-col gap-2 md:gap-[10px]">
          <label
            className="text-taskify-neutral-800 text-sm font-medium"
            htmlFor="description"
          >
            설명 <span className="text-taskify-violet-primary">*</span>
          </label>
          <Textarea
            rows={3}
            placeholder="할 일에 대한 상세한 설명을 입력하세요"
            {...register('description', {
              required: '설명은 필수 입력입니다.',
              maxLength: {
                value: 200,
                message: '설명은 최대 200자까지 입력할 수 있습니다.',
              },
            })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* 마감일 입력 */}
        <div className="flex flex-col gap-2 md:gap-[10px]">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="dueDate"
          >
            마감일
          </label>
          <Controller
            name="dueDate"
            control={control}
            defaultValue={defaultVals.dueDate}
            render={({ field }) => {
              return (
                <DateTimePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    field.onChange(
                      date ? format(date, 'yyyy-MM-dd HH:mm') : '',
                    );
                  }}
                  placeholder="마감일을 선택하세요"
                />
              );
            }}
          />
        </div>

        {/* 태그 선택 */}
        <div className="flex flex-col gap-2 md:gap-[10px]">
          <label className="text-sm font-medium text-gray-700" htmlFor="tags">
            태그
          </label>
          <Controller
            name="tags"
            control={control}
            defaultValue={defaultVals.tags}
            render={({ field }) => (
              <TagInput
                tags={field.value}
                onChange={field.onChange}
                placeholder="태그를 입력하고 ENTER을 눌러주세요"
                maxTags={7}
                size="sm"
              />
            )}
          />
        </div>

        {/* 이미지 섹션 */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="imageUrl"
          >
            이미지
          </label>
          <div className="h-[76px] w-[76px]">
            <Controller
              name="imageUrl"
              control={control}
              defaultValue={defaultVals.imageUrl}
              render={({ field: { onChange } }) => (
                <UploadImageButton
                  onUpload={handleUpload}
                  onChange={(url) => onChange(url)}
                  size="sm"
                />
              )}
            />
          </div>
        </div>
      </form>

      {/* 버튼 영역 */}
      <DialogFooter className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" onClick={handleUndoClick} type="button">
          취소
        </Button>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting || loading}
          className="bg-taskify-violet-primary text-white hover:bg-violet-900"
          onClick={handleSubmit(onSubmit)}
        >
          {mode === 'edit' ? '수정' : '생성'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  return content;
};

export default TodoEditDialog;
