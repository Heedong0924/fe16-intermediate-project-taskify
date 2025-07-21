'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import { emailValidation, passwordValidation } from '@/lib/validationRules';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  // 비밀번호 표시 토글 상태
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data: FormValues) => {
    console.log(data); // 사용자가 입력한 값
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <form
        className="flex w-full flex-col items-center justify-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Input
            label="이메일"
            type="email"
            autoComplete="email"
            isError={!!errors.email}
            isSuccess={dirtyFields.email && !errors.email}
            errorMessage={errors.email?.message}
            {...register('email', emailValidation)}
          />
          <Input
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
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
        <button
          className="bg-taskify-violet-primary w-full rounded-lg py-2 text-white"
          type="submit"
        >
          로그인
        </button>
      </form>
      <p className="">
        회원이 아니신가요?{' '}
        <Link href="/auth/register" className="text-taskify-violet-primary">
          회원가입
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
