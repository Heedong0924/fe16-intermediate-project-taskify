import { Invitation } from '@/types/Invitation';

import axiosInstance from '../axiosInstance';

// // 0. 공통 타입 정의

// export interface UserInfo {
//   id: number;
//   nickname: string;
//   email: string;
// }

// export interface DashboardInfo {
//   id: number;
//   title: string;
// }

// export interface Invitation {
//   id: number;
//   inviter: UserInfo;
//   invitee: UserInfo;
//   teamId: string;
//   dashboard: DashboardInfo;
//   inviteAccepted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// 1. GET - 내가 받은 초대 목록 조회

export interface GetInvitationsResponse {
  cursorId: number;
  invitations: Invitation[];
}

export interface GetInvitationsParams {
  size?: number;
  cursorId?: number;
  title?: string;
}

export const getInvitations = async ({
  size = 10,
  cursorId,
  title,
}: GetInvitationsParams): Promise<GetInvitationsResponse> => {
  console.log('[axios baseURL]', axiosInstance.defaults.baseURL);
  const params = Object.fromEntries(
    Object.entries({ size, cursorId, title }).filter(
      ([_, v]) => v !== undefined && v !== '',
    ),
  );
  const response = await axiosInstance.get(`/invitations`, { params });
  const { data } = response;

  return {
    cursorId: data.cursorId ?? null,
    invitations: Array.isArray(data.invitations)
      ? data.invitations
      : [data.invitations],
  };
  // const response = await axiosInstance.get<GetInvitationsResponse>(
  //   `/invitations`,
  //   { params },
  // );

  // return response.data;
};

// 2. PUT - 초대 응답

export interface PutInvitationsParams {
  invitationId: number;
}

export interface PutInvitationsRequest {
  inviteAccepted: boolean;
}

export const putInvitation = async (
  { invitationId }: PutInvitationsParams,
  body: PutInvitationsRequest,
): Promise<Invitation> => {
  const response = await axiosInstance.put<Invitation>(
    `/invitations/${invitationId}`,
    body,
  );
  return response.data;
};
