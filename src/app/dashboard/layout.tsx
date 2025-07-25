import React from 'react';

import Sidebar from '@/components/common/Sidebar';

export const metadata = {
  title: 'Dashboard | My Next.js App',
  description: 'Dashboard specific layout',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[160px] xl:ml-[300px]">{children}</main>
    </div>
  );
}
