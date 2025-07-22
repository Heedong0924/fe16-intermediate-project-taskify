'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '@/lib/validationRules';

type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  // 비밀번호 표시 토글 상태
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (): void => setShowPassword((prev) => !prev);

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
            label="닉네임"
            type="text"
            autoComplete="username"
            isError={!!errors.username}
            isSuccess={dirtyFields.username && !errors.username}
            errorMessage={errors.username?.message}
            {...register('username')}
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
          <Input
            label="비밀번호 확인"
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
                {...register(
                  'confirmPassword',
                  confirmPasswordValidation(getValues),
                )}
              />
            }
            onRightIconClick={togglePassword}
            isError={!!errors.confirmPassword}
            isSuccess={dirtyFields.confirmPassword && !errors.confirmPassword}
            errorMessage={errors.password?.message}
            {...register('password', passwordValidation)}
          />
        </div>
        <button
          className="bg-taskify-violet-primary w-full rounded-lg py-2 text-white"
          type="submit"
        >
          가입하기
        </button>
      </form>
      <p className="">
        이미 회원이신가요?{' '}
        <Link href="/auth/login" className="text-taskify-violet-primary">
          로그인
        </Link>
      </p>
    </div>
  );
};
export default SignupPage;
