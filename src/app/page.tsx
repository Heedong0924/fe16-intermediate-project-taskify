'use client';

import Image from 'next/image';
import Link from 'next/link';

import sectionImg from 'public/images/section.jpg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Welcome to My Next.js App!</h1>
      <p>Start building your amazing application.</p>
      <Image src={sectionImg} alt="테스트용 이미지" />
      <div className="flex w-full items-center justify-center p-5">
        <Link
          href="/login"
          className="bg-taskify-violet-primary rounded-md p-3 text-white"
        >
          로그인 하러가기
        </Link>
      </div>
    </main>
  );
}
