import DashboardInInvitation from './DashboardInInvitation';
import Invitee from './Invitee';
import Inviter from './Inviter';

export interface InvitationResponse {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: DashboardInInvitation;
  invitee: Invitee;
  inviteAccepted: boolean;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
}
