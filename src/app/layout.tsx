// src/app/layout.tsx
import type { Metadata } from 'next';

import './globals.css';
import pretendard from '../lib/utils/fonts/pretendard';

export const metadata: Metadata = {
  title: 'Taskify',
  description: '테스키파이..',
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
