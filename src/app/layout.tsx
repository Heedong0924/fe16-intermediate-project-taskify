// src/app/layout.tsx
import type { Metadata } from 'next';

import './globals.css';
import { GlobalDialog } from '@/components/common/dialog/GlobalDialog';
import QueryProviders from '@/lib/QueryProvider';

import LandingHeader from './components/LandingHeader';
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
      <body className={pretendard.variable}>
        <LandingHeader className="sticky top-0 z-50 h-15 w-full md:h-17.5" />
        <QueryProviders>
          {children}
          <GlobalDialog />
        </QueryProviders>
      </body>
    </html>
  );
}
