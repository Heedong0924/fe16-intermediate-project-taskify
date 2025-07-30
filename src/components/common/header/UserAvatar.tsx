import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const nicknameLength = user?.nickname.length ?? 0;
  const baseWidth = 100; // 최소 100px
  const perCharWidth = 8; // 글자당 8px 추가
  const menuWidth = Math.min(250, baseWidth + nicknameLength * perCharWidth);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 임시로 값이 없을 시 처리
  if (!user) return null;

  const handleMyPageClick = () => {
    setIsOpen(false);
    router.push('/mypage');
  };

  const handleDashboardClick = () => {
    setIsOpen(false);
    router.push('/mydashboard');
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout();
    router.push('/');
  };

  const menuItems = [
    { id: 'mypage', label: '내 정보', onClick: handleMyPageClick },
    { id: 'mydashboard', label: '내 대시보드', onClick: handleDashboardClick },
    { id: 'logout', label: '로그아웃', onClick: handleLogoutClick },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none"
      >
        <UserProfile
          userName={user.nickname}
          profileImg={user.profileImageUrl}
          size={isMobile ? 'md' : 'lg'}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 z-[9999] mt-2.5 rounded-md border border-gray-200 bg-white shadow-md"
          style={{ width: `${menuWidth}px` }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="text-taskify-lg-regular text-taskify-neutral-500 w-full px-3 py-2 text-left first:rounded-t-md last:rounded-b-md hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
