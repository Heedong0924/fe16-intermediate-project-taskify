import { useQuery } from '@tanstack/react-query';

import { getInvitations } from '@/lib/api/invitations';

// 초대 목록을 불러오는 훅

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => getInvitations({}),
  });
};

// 테스트용 훅

// import { mockInvitations } from '@/app/mydashboard/components/invitation/mockData';

// export const useGetInvitations = () => {
//   return {
//     data: {
//       invitations: mockInvitations,
//     },
//     isLoading: false,
//     isError: false,
//   };
// };
