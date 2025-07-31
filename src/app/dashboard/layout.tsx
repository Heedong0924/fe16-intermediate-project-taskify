import React from 'react';

import Header from '@/components/common/header/Header';
import MobailSizeHeader from '@/components/common/header/MobailSizeHeader';
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
      <main className="bg-taskify-neutral-100 flex-1 transition-all duration-300 md:ml-[160px] lg:ml-[300px]">
        <Header />
        <MobailSizeHeader />
        {children}
      </main>
    </div>
  );
}
