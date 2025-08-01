'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerChip } from '@/components/common/Chips';
import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import SkeletonLine from '@/components/ui/SkeletonLIne';
import { useDashboard, useUpdateDashboard } from '@/hooks/useDashboardEdit';
import { useSkeleton } from '@/hooks/useSkeleton';
import { dashboardTitleValidation } from '@/lib/validationRules';

type FormValues = {
  dashboardTitle: string;
};

// 값이 공백으로 들어갈 때 처리 하기
export default function DashboardUpdate({
  dashboardId,
  isSkeletonVisible,
}: {
  dashboardId: number;
  isSkeletonVisible: boolean;
}) {
  const [color, setColor] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange', // 입력이 바뀔 때마다 검사
    reValidateMode: 'onBlur', // 블러 시에도 다시 검사
  });

  const { data } = useDashboard(dashboardId);
  const { showSkeleton, isFadingOut } = useSkeleton(isSkeletonVisible, 1200);
  const shouldShowSkeleton = showSkeleton || !data;

  const mutation = useUpdateDashboard(dashboardId);

  useEffect(() => {
    // 대시보드가 정상적으로 로드 됐을 때
    if (data?.title) {
      reset({
        dashboardTitle: data.title,
      });
      setColor(data.color);
    }
  }, [data, reset]);

  const handleUpdate = (formData: FormValues) => {
    const title = formData.dashboardTitle.trim();
    mutation.mutate({ title, color });
  };

  return (
    <ContentSection
      title={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-full" isFadingOut={isFadingOut} />
        ) : (
          data?.title
        )
      }
    >
      <div className="mt-[24px] mb-[40px]">
        {shouldShowSkeleton ? (
          <SkeletonLine className="h-32 w-full" isFadingOut={isFadingOut} />
        ) : (
          <>
            <Input
              className="dashboard-update-title"
              label="대시보드 이름"
              type="text"
              placeholder="대시보드 이름을 적어주세요"
              isError={!!errors.dashboardTitle}
              isSuccess={dirtyFields.dashboardTitle && !errors.dashboardTitle}
              errorMessage={errors.dashboardTitle?.message}
              {...register('dashboardTitle', dashboardTitleValidation)}
            />
            <div className="mt-[16px]">
              <ColorPickerChip value={color} onChange={setColor} />
            </div>
          </>
        )}
      </div>

      {shouldShowSkeleton ? (
        <SkeletonLine className="h-13 w-full" isFadingOut={isFadingOut} />
      ) : (
        <Button
          color="violet-white"
          className="h-[54px] w-full"
          onClick={handleSubmit(handleUpdate)}
          disabled={!isValid || isSubmitting}
        >
          변경
        </Button>
      )}
    </ContentSection>
  );
}
