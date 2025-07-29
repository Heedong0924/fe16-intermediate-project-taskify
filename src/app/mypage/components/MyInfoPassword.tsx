import { useForm } from 'react-hook-form';

import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { useChangePassword } from '@/hooks/useMyInfoEdit';
import {
  passwordValidation,
  confirmPasswordValidation,
} from '@/lib/validationRules';
// import { useEffect, useState } from 'react';

type FormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export default function MyInfoPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  // isLoading, error
  const { mutate: changePassword } = useChangePassword();

  const onSubmit = (data: FormValues) => {
    changePassword(data);
    reset({
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    // 완료되면 인풋 초기화 시켜야함..........!!!
    <ContentSection title="비밀번호 변경">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <Input
          label="현재 비밀번호"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호 입력"
          isError={!!errors.password}
          isSuccess={dirtyFields.password && !errors.password}
          errorMessage={errors.password?.message}
          {...register('password', passwordValidation)}
        />
        <Input
          className="my-4"
          label="새 비밀번호"
          type="password"
          autoComplete="new-Password"
          placeholder="새 비밀번호 입력"
          isError={!!errors.newPassword}
          isSuccess={dirtyFields.newPassword && !errors.newPassword}
          errorMessage={errors.newPassword?.message}
          {...register('newPassword', passwordValidation)}
        />
        <Input
          className="mb-6"
          label="새 비밀번호 확인"
          type="password"
          autoComplete="new-Password"
          placeholder="새 비밀번호 입력"
          isError={!!errors.confirmPassword}
          isSuccess={dirtyFields.confirmPassword && !errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          {...register(
            'confirmPassword',
            confirmPasswordValidation(() => ({
              password: getValues('newPassword'),
            })),
          )}
        />
        <Button
          color="violet-white"
          className="btn-modal-db w-full"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          변경
        </Button>
      </form>
    </ContentSection>
  );
}
