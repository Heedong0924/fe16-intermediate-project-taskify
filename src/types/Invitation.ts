export interface Invitation {
  id: number;
  inviter: {
    id: number;
    nickname: string;
    email: string;
  };
  dashboard: {
    id: string;
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
}
