'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ColorPickerChip } from '@/components/common/Chips';
import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { useDashboard, useUpdateDashboard } from '@/hooks/useDashboardEdit';
import { dashboardTitleValidation } from '@/lib/validationRules';

type FormValues = {
  dashboardTitle: string;
};

// 값이 공백으로 들어갈 때 처리 하기
export default function DashboardUpdate({
  dashboardsId,
}: {
  dashboardsId: number;
}) {
  const [color, setColor] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange', // 입력이 바뀔 때마다 검사
    reValidateMode: 'onBlur', // 블러 시에도 다시 검사
  });

  const { data, isPending, isError } = useDashboard(dashboardsId);
  const mutation = useUpdateDashboard(dashboardsId);

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

  if (isPending) return <p>로딩 중...</p>;
  // 404 페이지와 함께 모달 띄우기
  if (isError) return <p>실패...</p>;

  return (
    <ContentSection title={data.title}>
      <Input
        className="dashboard-update-title mt-[24px]"
        label="대시보드 이름"
        type="text"
        placeholder="대시보드 이름을 적어주세요"
        isError={!!errors.dashboardTitle}
        isSuccess={dirtyFields.dashboardTitle && !errors.dashboardTitle}
        errorMessage={errors.dashboardTitle?.message}
        {...register('dashboardTitle', dashboardTitleValidation)}
      />
      <div className="mt-[16px] mb-[40px]">
        <ColorPickerChip value={color} onChange={setColor} size="md" />
      </div>
      <Button
        color="violet-white"
        className="h-[54px] w-full"
        onClick={handleSubmit(handleUpdate)}
      >
        변경
      </Button>
    </ContentSection>
  );
}
