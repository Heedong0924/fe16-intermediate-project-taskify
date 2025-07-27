import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import UploadImageButtonCopy from '@/components/common/UploadImageButtonCopy';
import Button from '@/components/ui/Buttons';
import {
  useMyInfo,
  useUpdateMyInfo,
  useUploadProfileImage,
} from '@/hooks/useMyInfoEdit';
import { nicknameValidation } from '@/lib/validationRules';
import { useAuthStore } from '@/stores/useAuthStore';

type FormValues = {
  nickname: string;
};

export default function MyInfoProfile() {
  const { user, setUser } = useAuthStore(); // 스토리지
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  const { data } = useMyInfo();
  const mutation = useUpdateMyInfo();
  const { mutateAsync: uploadImage } = useUploadProfileImage();

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
    // 받은 파일 미리보기
    const previewUrl = URL.createObjectURL(file);
    setProfileImageUrl(previewUrl);

    // 서버에 이미지 보냄? 맞?
    const uploadedUrl = await uploadImage(file);
    setProfileImageUrl(uploadedUrl);

    return uploadedUrl;
  };

  const handleUpload = (formData: FormValues) => {
    const nicknameData = formData.nickname.trim() ?? '';
    const profileImageUrlData = profileImageUrl ?? data?.profileImageUrl ?? '';

    mutation.mutate(
      {
        nickname: nicknameData,
        profileImageUrl: profileImageUrlData,
      },
      {
        onSuccess: () => {
          setUser({
            ...user!, // 기존 유저 정보 전체 유지
            nickname: nicknameData,
            profileImageUrl: profileImageUrlData,
          });
        },
      },
    );
  };

  return (
    <>
      {/* 프로필이 성공적으로 업데이트가 되면 스토리지에도 정보를 보내야함 */}
      <ContentSection title="프로필">
        <>
          <UploadImageButtonCopy
            initialImageUrl={profileImageUrl}
            onUpload={handleFileSelect}
            onChange={(url) => setProfileImageUrl(url)}
          />
          <Input label="이메일" value={data?.email ?? ''} disabled />
          {/* 닉네임 10자 이하 작성... Validation 추가 */}
          <Input
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
            onClick={handleSubmit(handleUpload)}
            // disabled={!isValid || isSubmitting || isLoading}
          >
            저장
          </Button>
        </>
      </ContentSection>
    </>
  );
}
