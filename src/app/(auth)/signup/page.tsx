'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import { useAuth } from '@/hooks/useAuth';
import {
  emailValidation,
  nicknameValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '@/lib/validationRules';

/**
 * 회원가입 페이지 컴포넌트
 * - 이메일, 닉네임, 비밀번호, 비밀번호 확인 입력 필드
 * - 비밀번호 표시 토글 기능
 * - 이용약관 동의 체크박스
 * - 가입하기 버튼
 * - 이미 회원인 경우 로그인 페이지로 이동 링크
 * - 회원가입 성공 시 자동 로그인 처리(useAuth 훅 사용)
 * - 에러 메시지 표시
 */

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  // 비밀번호 표시 토글 상태
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (): void => setShowPassword((prev) => !prev);
  const { signup, isLoading } = useAuth();
  const onSubmit = (data: FormValues) => {
    console.log(data); // 사용자가 입력한 값
    signup({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
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
            placeholder="이메일을 입력해 주세요"
            isError={!!errors.email}
            isSuccess={dirtyFields.email && !errors.email}
            errorMessage={errors.email?.message}
            {...register('email', emailValidation)}
          />
          <Input
            label="닉네임"
            type="text"
            autoComplete="nickname"
            placeholder="닉네임을 입력해 주세요"
            isError={!!errors.nickname}
            isSuccess={dirtyFields.nickname && !errors.nickname}
            errorMessage={errors.nickname?.message}
            {...register('nickname', nicknameValidation)}
          />
          <Input
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="8자 이상 입력해 주세요"
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
            placeholder="비밀번호를 한번 더 입력해 주세요"
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
            isError={!!errors.confirmPassword}
            isSuccess={dirtyFields.confirmPassword && !errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register(
              'confirmPassword',
              confirmPasswordValidation(getValues),
            )}
          />
        </div>
        <div className="flex w-full items-center justify-start gap-2">
          {/* label에 input을 중첩하면 항상 연관성이 보장됩니다 */}
          <label
            htmlFor="terms-checkbox"
            className="flex items-center gap-2 text-black"
          >
            <input type="checkbox" id="terms-checkbox" className="" />
            이용약관에 동의합니다.
          </label>
        </div>
        <button
          className="bg-taskify-violet-primary w-full rounded-lg py-2 text-white"
          type="submit"
          disabled={!isValid || isSubmitting || isLoading}
        >
          가입하기
        </button>
      </form>
      <p className="">
        이미 회원이신가요?{' '}
        <Link href="/login" className="text-taskify-violet-primary">
          로그인
        </Link>
      </p>
    </div>
  );
};
export default SignupPage;
