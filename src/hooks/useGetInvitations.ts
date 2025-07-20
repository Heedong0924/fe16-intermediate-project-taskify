import { useQuery } from '@tanstack/react-query';

import { getInvitations } from '@/lib/api/invitations';

// 초대 목록을 불러오는 훅

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ['invitations'],
    queryFn: () => getInvitations({}),
  });
};
