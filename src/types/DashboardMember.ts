export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface MemberResponse {
  totalCount: number;
  members: Member[];
}

export interface MemberQueryParams {
  page?: number;
  size?: number;
  dashboardId?: number;
}
