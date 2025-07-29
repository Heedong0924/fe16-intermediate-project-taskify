'use client';

import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import MyInfoPassword from './components/MyInfoPassword';
import MyInfoProfile from './components/MyInfoProfile';

export default function MyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--gray-FAFAFA)] p-[20px]">
      {/* 뒤로가기 */}
      <nav className="mb-[10px] sm:mb-[25px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <Image
            src="/images/arrow-left.svg"
            alt="돌아가기"
            width={20}
            height={20}
          />
          돌아가기
        </button>
      </nav>
      {/* 프로필 */}
      <MyInfoProfile />
      {/* 비밀번호 변경 */}
      <MyInfoPassword />
    </div>
  );
}
