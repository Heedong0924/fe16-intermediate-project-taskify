import React from 'react';

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
    <div className="flex h-screen xl:overflow-hidden">
      <main className="flex h-full shrink-0 grow flex-nowrap overflow-x-auto px-0 xl:overflow-y-hidden">
        {children}
      </main>
    </div>
  );
}
