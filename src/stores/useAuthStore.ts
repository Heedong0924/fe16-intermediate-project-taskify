import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { User } from '@/types/User.type';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  // Zustand의 미들웨어인 persist를 사용하여 상태를 로컬 스토리지에 저장
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      accessToken: null,
      isAuth: false,

      // 상태 설정 함수
      setUser: (user: User) => set({ user, isAuth: true }), // 변경: 로그인 시 isAuth=true
      setToken: (token: string) => set({ accessToken: token }), // 변경: 토큰 저장

      // 로그아웃 액션
      logout: () => {
        set({ user: null, accessToken: null, isAuth: false });
      },
    }),
    {
      name: 'user-storage', // 로컬 스토리지 키
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지 사용
    },
  ),
);
