import React from 'react';

import Header from '@/components/common/header/Header';
import MobailSizeHeader from '@/components/common/header/MobailSizeHeader';
import Sidebar from '@/components/common/Sidebar';

export const metadata = {
  title: 'My Page | Taskify',
  description:
    '내 정보, 비밀번호 변경, 프로필 사진을 설정할 수 있는 마이페이지입니다.',
};

export default function MypageLayout({
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
