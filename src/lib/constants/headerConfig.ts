export const headerConfig = [
  {
    match: (pathname: string) => pathname === '/mydashboard',
    config: {
      title: '나의 대시보드',
      showInviteButton: true,
      showManageButton: true,
    },
  },
  {
    match: (pathname: string) => pathname.startsWith('/dashboard/'),
    config: {
      titleFrom: 'dashboardTitle',
      showMemberAvatars: true,
      showInviteButton: true,
      showManageButton: true,
    },
  },
  {
    match: (pathname: string) => pathname === '/mypage',
    config: {
      title: '계정관리',
    },
  },
];
