'use client';

import Image from 'next/image';

import { KebobMenu, MenuItem } from '@/components/common/KebobMenu';
import sectionImg from 'public/images/section.jpg';

export default function Home() {
  const menuItems: MenuItem[] = [
    {
      key: 'edit',
      label: 'Edit',
      onSelect: () => console.log('Edit'),
      variant: 'disabled', // 예시로 disabled 상태로 설정
    },
    {
      key: 'delete',
      label: 'Delete',
      onSelect: () => console.log('Delete'),
      variant: 'red',
    },
    {
      key: 'view',
      label: 'View',
      onSelect: () => console.log('View'),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Welcome to My Next.js App!</h1>
      <p>Start building your amazing application.</p>
      <Image src={sectionImg} alt="테스트용 이미지" />
      <div className="w-full p-5">
        <div className="flex items-center justify-end">
          <KebobMenu
            menuItems={menuItems} // 메뉴 아이템을 KebobMenu에 전달
          />
        </div>
      </div>
    </main>
  );
}
