'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaState = 'default' | 'focus' | 'error' | 'success';

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  /** 라벨 텍스트 */
  label?: string;
  /** 에러 상태 여부 */
  isError?: boolean;
  /** 성공 상태 여부 */
  isSuccess?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 헬프 메시지 */
  helpMessage?: string;
  /** 컨테이너 추가 클래스 */
  className?: string;
  /** textarea 추가 클래스 */
  textareaClassName?: string;
  /** 행 수 (rows) */
  rows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      isError = false,
      isSuccess = false,
      errorMessage,
      helpMessage,
      className,
      textareaClassName,
      disabled = false,
      id,
      rows = 4,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    // 포커스 상태
    const [isFocused, setIsFocused] = useState(false);

    // 현재 상태 계산
    const getState = (): TextareaState => {
      if (isError) return 'error';
      if (isSuccess) return 'success';
      if (isFocused) return 'focus';
      return 'default';
    };

    // 상태별 border 스타일
    const getBorderClass = (state: TextareaState): string => {
      const map: Record<TextareaState, string> = {
        default: 'border-gray-300 hover:border-gray-400',
        focus: 'border-violet-500 ring-2 ring-violet-100',
        error: 'border-red-500 ring-2 ring-red-100',
        success: 'border-green-500 ring-2 ring-green-100',
      };
      return map[state];
    };

    // Focus 핸들러
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    // Blur 핸들러
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const currentState = getState();
    const borderClass = getBorderClass(currentState);
    const disabledClass = disabled
      ? 'bg-gray-50 cursor-not-allowed'
      : 'bg-white';

    return (
      <div className={twMerge('flex w-full flex-col', className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              'mb-2 text-sm font-medium text-gray-700',
              disabled && 'text-gray-400',
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={twMerge(
            'w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200',
            'placeholder:text-gray-400 focus:outline-none',
            borderClass,
            disabledClass,
            textareaClassName,
          )}
          {...props}
        />

        {/* 에러 / 헬프 메시지 */}
        {(errorMessage || helpMessage) && (
          <div className="mt-1 min-h-[1.25rem]">
            {errorMessage ? (
              <p className="text-xs text-red-600">{errorMessage}</p>
            ) : (
              helpMessage && (
                <p className="text-xs text-gray-500">{helpMessage}</p>
              )
            )}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
