export interface Invitation {
  id: number;
  inviter: {
    id: number;
    nickname: string;
    email: string;
  };
  dashboard: {
    id: number | string;
    title: string;
  };
  invitee: {
    id: number;
    nickname: string;
    email: string;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  teamId?: string;
}

export interface InvitationsResponse {
  totalCount: number;
  invitations: Invitation[];
}
