import React from 'react';

import Header from '@/components/common/header/Header';
import MobailSizeHeader from '@/components/common/header/MobailSizeHeader';
import Sidebar from '@/components/common/Sidebar';

export const metadata = {
  title: 'My Dashboard | Taskify',
  description:
    '참여 중인 모든 대시보드와 초대받은 대시보드를 확인하고 관리할 수 있는 페이지입니다.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <main className="bg-taskify-neutral-100 flex-1 transition-all duration-300 md:ml-[160px] md:w-[calc(100%-160px)] lg:ml-[300px] lg:w-[calc(100%-300px)]">
        <Header />
        <MobailSizeHeader />
        {children}
      </main>
    </div>
  );
}
