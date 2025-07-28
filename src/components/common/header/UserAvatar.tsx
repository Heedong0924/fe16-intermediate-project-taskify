import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';

import { UserProfile } from '../Profile';

// 모바일인 경우만 구분
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 기준 md: 768px
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const UserAvatar = () => {
  const isMobile = useIsMobile();
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const router = useRouter();

  // 임시로 값이 없을 시 처리
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <UserProfile
            userName={user.nickname}
            profileImg={user.profileImageUrl}
            size={isMobile ? 'md' : 'lg'}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-50"
        forceMount
      >
        <DropdownMenuItem onClick={() => router.push('/mypage')}>
          내 정보
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/mydashboard')}>
          내 대시보드
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            logout();
            router.push('/');
          }}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
