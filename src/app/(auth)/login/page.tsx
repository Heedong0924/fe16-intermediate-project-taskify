'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { emailValidation, passwordValidation } from '@/lib/validationRules';

/**
 * 로그인 페이지 컴포넌트
 * - 이메일, 비밀번호 입력 필드
 * - 비밀번호 표시 토글 기능
 * - 로그인 버튼
 * - 회원가입 페이지로 이동 링크
 * - 로그인 성공 시 사용자 정보를 스토어에 저장하고 리다이렉트(useAuth 훅 사용)
 * - 에러 메시지 표시
 */

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  // 비밀번호 표시 토글 상태
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const { login, isLoading } = useAuth();
  const onSubmit = (data: FormValues) => {
    login(data, {
      onSettled: () => reset(), // 로그인 후 폼 리셋
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 md:gap-6">
      <form
        className="flex w-full flex-col items-center justify-center gap-4 md:gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 md:gap-6">
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            autoComplete="email"
            isError={!!errors.email}
            isSuccess={dirtyFields.email && !errors.email}
            errorMessage={errors.email?.message}
            {...register('email', emailValidation)}
          />
          <Input
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            autoComplete="current-password"
            rightIcon={
              <Image
                src={
                  showPassword
                    ? '/images/icon/visibility.svg'
                    : '/images/icon/visibility_off.svg'
                }
                alt="비밀번호 보기"
                width={24}
                height={24}
              />
            }
            onRightIconClick={togglePassword}
            isError={!!errors.password}
            isSuccess={dirtyFields.password && !errors.password}
            errorMessage={errors.password?.message}
            {...register('password', passwordValidation)}
          />
        </div>
        <Button
          variant="default"
          size="lg"
          disabled={!isValid || isSubmitting || isLoading}
          className="bg-taskify-violet-primary w-full rounded-lg py-2 text-white"
          type="submit"
        >
          로그인
        </Button>
      </form>
      <p className="">
        회원이 아니신가요?{' '}
        <Link href="/signup" className="text-taskify-violet-primary">
          회원가입
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
