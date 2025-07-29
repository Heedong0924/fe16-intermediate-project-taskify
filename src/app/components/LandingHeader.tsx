'use client';

import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import { HTMLAttributes, useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

// interface LandingHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const LandingHeader = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { isAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuth === true && pathname === '/') {
      router.replace('/mydashboard');
    }
  }, [isAuth, router, pathname]);

  return (
    pathname === '/' && (
      <header
        className={clsx(
          'bg-taskify-neutral-900 text-taskify-neutral-0 text-center',
          className,
        )}
      >
        header
      </header>
    )
  );
};

export default LandingHeader;
