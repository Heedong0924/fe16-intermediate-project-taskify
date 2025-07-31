import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import UploadImageButtonCopy from '@/components/common/UploadImageButton_Mypage';
import Button from '@/components/ui/Buttons';
import SkeletonLine from '@/components/ui/SkeletonLIne';
import {
  useMyInfo,
  useUpdateMyInfo,
  useUploadProfileImage,
} from '@/hooks/useMyInfoEdit';
import { useSkeleton } from '@/hooks/useSkeleton';
import { nicknameValidation } from '@/lib/validationRules';

type FormValues = {
  nickname: string;
};

export default function MyInfoProfile({
  isSkeletonVisible,
}: {
  isSkeletonVisible: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  const { data } = useMyInfo();
  const mutation = useUpdateMyInfo();
  // 이미지 업로드
  const {
    mutateAsync: uploadImage,
    isPending: imgPending,
    isError: imgError,
  } = useUploadProfileImage();

  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    data?.profileImageUrl,
  );

  useEffect(() => {
    if (data?.nickname) {
      reset({ nickname: data.nickname });
    }
    if (data?.profileImageUrl) {
      setProfileImageUrl(data.profileImageUrl);
    }
  }, [data, reset]);

  const handleFileSelect = async (file: File): Promise<string> => {
    // 업로드 전 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setProfileImageUrl(previewUrl);

    // 파일 서버에 업로드, 실제 이미지 URL 받아옴
    const uploadedUrl = await uploadImage(file);
    setProfileImageUrl(uploadedUrl);

    return uploadedUrl;
  };

  const handleUpload = (formData: FormValues) => {
    const nicknameData = formData.nickname.trim() ?? '';
    const profileImageUrlData = profileImageUrl ?? data?.profileImageUrl ?? '';

    mutation.mutate({
      nickname: nicknameData,
      profileImageUrl: profileImageUrlData || undefined,
    });
  };

  const { showSkeleton, isFadingOut } = useSkeleton(isSkeletonVisible, 1200);

  const shouldShowSkeleton = showSkeleton || !data;

  return (
    <ContentSection
      title={
        shouldShowSkeleton ? (
          <SkeletonLine className="h-10 w-full" isFadingOut={isFadingOut} />
        ) : (
          '프로필'
        )
      }
    >
      <div className="md:mt-6 md:grid md:grid-cols-[auto_1fr] md:gap-10">
        {shouldShowSkeleton ? (
          <>
            <SkeletonLine
              className="my-10 size-[100px] md:my-0 md:size-[182px]"
              isFadingOut={isFadingOut}
            />
            <div className="h-[239px]">
              <SkeletonLine
                className="h-full w-full"
                isFadingOut={isFadingOut}
              />
            </div>
          </>
        ) : (
          <>
            <UploadImageButtonCopy
              className="my-10 size-[100px] transition-all md:my-0 md:size-[182px]"
              initialImageUrl={profileImageUrl}
              onUpload={handleFileSelect}
              onImageChange={(url) => setProfileImageUrl(url)}
            />
            <div>
              <Input
                className="input-email mb-4"
                label="이메일"
                value={data?.email ?? ''}
                disabled
              />
              <Input
                className="mb-6"
                label="닉네임"
                type="text"
                autoComplete="nickname"
                placeholder="닉네임을 적어주세요"
                isError={!!errors.nickname}
                isSuccess={dirtyFields.nickname && !errors.nickname}
                errorMessage={errors.nickname?.message}
                {...register('nickname', nicknameValidation)}
              />
              <Button
                color="violet-white"
                className="btn-modal-db w-full"
                onClick={handleSubmit(handleUpload)}
                disabled={!isValid || isSubmitting || imgPending || imgError}
              >
                {imgPending ? '이미지 업로드 중...' : '저장'}
              </Button>
            </div>
          </>
        )}
      </div>
    </ContentSection>
  );
}
