'use client';

import clsx from 'clsx';
import Image from 'next/image';
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
} from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuPencilLine } from 'react-icons/lu';

// onUpload로 파일 업로드, onChange로 폼으로 url 전달

// initialImageUrl 사용자의 이미지를 받음
type UploadImageButtonProps = {
  onUpload: (file: File) => Promise<string>;
  onImageChange: (url: string) => void;
  initialImageUrl?: string; // 추가
} & HTMLAttributes<HTMLDivElement>;

const UploadImageButton = ({
  onUpload,
  onImageChange: onChange,
  initialImageUrl,
  ...rest
}: UploadImageButtonProps) => {
  // 디폴트 이미지 없음
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl ?? null, // 추가
  );

  // 추가
  useEffect(() => {
    setImageUrl(initialImageUrl ?? null);
  }, [initialImageUrl]);

  // 숨겨진 input에 접근하기 위한 useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 사용자가 선택한 첫 번째 파일 가져오기, 없으면 종료
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 업로드 함수 실행 -> 반환된 이미지 URL을 상태 및 onChange로 전달
    const uploadedUrl = await onUpload(file);
    setImageUrl(uploadedUrl);
    onChange(uploadedUrl);
  };
  // 커스텀 UI 클릭 시 숨겨진 파일 input 클릭 유도
  const triggerUpload = () => fileInputRef.current?.click();

  // css 추후 수정 예정
  // 키다운 다시 설정 필요함.
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={triggerUpload}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') triggerUpload();
      }}
      className={clsx(
        // 사이즈 따로 뺌
        'group relative cursor-pointer overflow-hidden rounded-lg border border-dashed border-gray-300',
        rest.className,
      )}
    >
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt="preview"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <LuPencilLine className="h-6 w-6 text-white" />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 text-sm text-gray-500">
          <FaPlus className="text-taskify-violet-primary mb-1 h-6 w-6" />
        </div>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/gif"
      />
    </div>
  );
};

export default UploadImageButton;
