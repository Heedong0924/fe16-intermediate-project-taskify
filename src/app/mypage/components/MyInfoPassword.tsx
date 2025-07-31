import { useForm } from 'react-hook-form';

import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import SkeletonLine from '@/components/ui/SkeletonLIne';
import { useChangePassword, useMyInfo } from '@/hooks/useMyInfoEdit';
import { useSkeleton } from '@/hooks/useSkeleton';
import {
  passwordValidation,
  confirmPasswordValidation,
} from '@/lib/validationRules';

type FormValues = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export default function MyInfoPassword({
  isSkeletonVisible,
}: {
  isSkeletonVisible: boolean;
}) {
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

  const { mutate: changePassword } = useChangePassword();

  const { data: myInfoData } = useMyInfo();
  const { showSkeleton, isFadingOut } = useSkeleton(isSkeletonVisible, 1200);
  const shouldShowSkeleton = showSkeleton || !myInfoData;

  const onSubmit = (data: FormValues) => {
    changePassword(data);
    reset({
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <ContentSection
      title={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-full" isFadingOut={isFadingOut} />
        ) : (
          '비밀번호 변경'
        )
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        {shouldShowSkeleton ? (
          <SkeletonLine
            className="mb-[24px] h-[255px] w-full"
            isFadingOut={isFadingOut}
          />
        ) : (
          <div className="mb-6 h-[255px]">
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
          </div>
        )}
        {shouldShowSkeleton ? (
          <SkeletonLine className="h-13 w-full" isFadingOut={isFadingOut} />
        ) : (
          <Button
            color="violet-white"
            className="btn-modal-db w-full"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            변경
          </Button>
        )}
      </form>
    </ContentSection>
  );
}
