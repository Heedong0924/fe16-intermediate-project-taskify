'use client';

import Image from 'next/image';
import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuPencilLine } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

import { useDialogStore } from '@/stores/useDialogStore';

import AlertDialog from './dialog/AlertDialog';

/**
 * 이미지 업로드 버튼 컴포넌트 (sm 사이즈 고정)
 * @param onUpload - 파일 업로드 처리 함수 (문자열 URL 또는 {imageUrl: string} 객체 반환)
 * @param onChange - 폼으로 URL 전달 함수
 * @param value - 현재 이미지 URL
 */
type UploadImageButtonProps = {
  onUpload: (file: File) => Promise<string | { imageUrl: string }>;
  onChange: (url: string) => void;
  value?: string | null;
};

const UploadImageButton = ({
  onUpload,
  onChange,
  value,
}: UploadImageButtonProps) => {
  const { openDialog } = useDialogStore();
  const [imageUrl, setImageUrl] = useState<string | null>(value ?? null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // value prop 변경 시 내부 상태 동기화
  useEffect(() => {
    setImageUrl(value ?? null);
    setImageError(false); // URL이 변경되면 에러 상태 초기화
  }, [value]);

  /**
   * 파일 변경 핸들러
   * @param e - 파일 입력 이벤트
   */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="이미지 파일만 업로드 가능합니다."
            closeBtnText="확인"
            isGoBack
          />
        ),
        isNewOpen: true,
      });
      return;
    }

    if (
      file.type === 'image/svg+xml' ||
      file.name.toLowerCase().endsWith('.svg')
    ) {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="SVG 파일은 업로드할 수 없습니다."
            closeBtnText="확인"
            isGoBack
          />
        ),
        isNewOpen: true,
      });
      return;
    }

    setIsLoading(true);
    setImageError(false);

    try {
      const uploadedUrl = await onUpload(file);

      // URL 추출 (객체인 경우 imageUrl 속성 사용)
      const finalUrl =
        typeof uploadedUrl === 'string' ? uploadedUrl : uploadedUrl.imageUrl;

      setImageUrl(finalUrl);
      onChange(finalUrl);
    } catch (err) {
      openDialog({
        dialogComponent: (
          <AlertDialog
            description="이미지 업로드에 실패했습니다."
            closeBtnText="확인"
            isGoBack
          />
        ),
        isNewOpen: true,
      });
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 이미지 로드 에러 핸들러
   */
  const handleImageError = () => {
    console.error('Image load error:', imageUrl);
    setImageError(true);

    openDialog({
      dialogComponent: (
        <AlertDialog
          description="이미지 미리보기를 실패했습니다."
          closeBtnText="확인"
          isGoBack
        />
      ),
      isNewOpen: true,
    });

    // 에러 시 기본 상태로 복원
    setImageUrl(null);
    onChange('');
  };

  /**
   * 파일 선택 트리거
   */
  const triggerUpload = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  /**
   * 키보드 이벤트 핸들러
   * @param e - 키보드 이벤트
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isLoading) {
      e.preventDefault();
      triggerUpload();
    }
  };

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={triggerUpload}
        onKeyDown={handleKeyDown}
        className={twMerge(
          'group relative h-14 w-14 cursor-pointer overflow-hidden rounded-lg border border-dashed border-gray-300 transition-colors hover:border-gray-400 md:h-19 md:w-19',
          isLoading && 'cursor-not-allowed opacity-50',
        )}
        aria-label="이미지 업로드"
      >
        {imageUrl && !imageError ? (
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt="업로드된 이미지 미리보기"
              fill
              className="object-cover"
              onError={handleImageError}
              sizes="(max-width: 768px) 56px, 76px"
              unoptimized={process.env.NODE_ENV === 'development'}
            />

            {/* 호버 오버레이 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <LuPencilLine className="h-6 w-6 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 text-sm text-gray-500">
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
            ) : (
              <FaPlus className="mb-1 h-6 w-6 text-violet-500" />
            )}
            <span className="mt-1 text-xs">
              {isLoading ? '업로드 중...' : '이미지 추가'}
            </span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default UploadImageButton;
