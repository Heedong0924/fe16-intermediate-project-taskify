import { useMutation, useQueryClient } from '@tanstack/react-query';

import { putInvitation } from '@/lib/api/invitations';

// 초대 수락-거절 훅

export const usePutInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { invitationId: number; inviteAccepted: boolean }) =>
      putInvitation(
        { invitationId: params.invitationId },
        { inviteAccepted: params.inviteAccepted },
      ),
    // 성공 시 초대 목록 다시 불러오기
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
};
