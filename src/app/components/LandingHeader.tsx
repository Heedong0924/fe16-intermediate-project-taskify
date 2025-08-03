'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';

import UserAvatar from '@/components/common/header/UserAvatar';
import { LogoMd, LogoSm } from '@/components/ui/SVGLogo';
import { useAuthStore } from '@/stores/useAuthStore';

// interface LandingHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const LandingHeader = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { isAuth } = useAuthStore();
  const pathname = usePathname();

  return (
    pathname === '/' && (
      <header
        className={clsx(
          'bg-taskify-neutral-0 dark:bg-taskify-neutral-900 text-taskify-neutral-700 dark:text-taskify-neutral-0 flex justify-between px-6 py-4 shadow-2xl md:px-10 xl:px-20 dark:shadow-black',
          className,
        )}
      >
        <Link className="relative h-7 w-6 md:hidden" href="/">
          <LogoSm className="dark:fill-white" />
        </Link>
        <Link className="relative top-1 hidden h-10 w-30 md:block" href="/">
          <LogoMd className="dark:fill-white" />
        </Link>
        {isAuth ? (
          <UserAvatar />
        ) : (
          <ul className="flex items-center justify-between gap-6 md:gap-9">
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
          </ul>
        )}
      </header>
    )
  );
};

export default LandingHeader;
