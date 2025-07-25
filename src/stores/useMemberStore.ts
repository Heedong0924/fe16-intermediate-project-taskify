import { create } from 'zustand';

import { Member } from '@/types/DashboardMember';

interface MemberInfos {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  isOwner: boolean;
}

interface MemberState {
  members: Member[];
  setMembers: (members: Member[]) => void;
  getMembers: () => Member[];
  getMemberInfos: () => MemberInfos[];
}

export const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  setMembers: (newMembers: Member[]) => set({ members: newMembers }),
  getMembers: () => get().members,
  getMemberInfos: () =>
    get().members.map((e) => {
      return {
        id: e.id,
        nickname: e.nickname,
        profileImageUrl: e.profileImageUrl,
        isOwner: e.isOwner,
      };
    }),
}));
