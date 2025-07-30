'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

import Button from '@/components/ui/Buttons';
import { useAuthStore } from '@/stores/useAuthStore';

const LandingLoginButton = ({
  className,
}: HTMLAttributes<HTMLButtonElement>) => {
  const { isAuth } = useAuthStore();
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={() =>
        isAuth ? router.push('/mydashboard') : router.push('/login')
      }
    >
      <span className="text-taskify-md-medium md:text-taskify-2lg-medium">
        {isAuth ? '나의 대쉬보드 보기' : '로그인하기'}
      </span>
    </Button>
  );
};

export default LandingLoginButton;
