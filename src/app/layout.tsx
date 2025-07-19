// src/app/layout.tsx
import type { Metadata } from 'next';

import './globals.css';
import pretendard from './lib/utils/fonts/pretendard';

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A boilerplate for my Next.js project.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>{children}</body>
    </html>
  );
}
