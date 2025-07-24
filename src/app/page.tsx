'use client';

import Image from 'next/image';

import sectionImg from 'public/images/section.jpg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Welcome to My Next.js App!</h1>
      <p>Start building your amazing application.</p>
      <Image src={sectionImg} alt="테스트용 이미지" />
      <div className="w-full p-5">
        <div className="flex items-center justify-end">hello</div>
      </div>
    </main>
  );
}
