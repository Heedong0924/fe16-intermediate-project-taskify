'use client';

import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth, hydrated } = useAuthStore();
  const router = useRouter();

  useLayoutEffect(() => {
    if (hydrated && !isAuth) {
      console.warn('인증되지 않은 사용자 접근 시도');
      router.replace('/login');
    }
  }, [hydrated, isAuth, router]);

  // 복원 전 또는 인증 안 됐으면 아무것도 안 그리기
  if (!hydrated || !isAuth) {
    return null;
  }

  return <div>{children}</div>;
}
