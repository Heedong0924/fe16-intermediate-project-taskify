import React from 'react';

import Header from '@/components/common/header/Header';
import Sidebar from '@/components/common/Sidebar';

export const metadata = {
  title: 'Dashboard | Taskify',
  description: '대시보드 상세 페이지입니다.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <Header />
      <main className="flex-1 md:mt-[90px] md:ml-[160px] xl:ml-[300px]">
        {children}
      </main>
    </div>
  );
}
