import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { User } from '@/types/User.type';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
  hydrated: boolean; // Zustand의 hydrated 상태를 관리하기 위한 변수
  setHydrated: (hydrated: boolean) => void;
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
      hydrated: false, // 초기 hydrated 상태

      // 상태 설정 함수
      setUser: (user: User) => set({ user, isAuth: true }),
      setToken: (token: string) => set({ accessToken: token }),
      setHydrated: (hydrated: boolean) => set({ hydrated }),

      // 로그아웃 액션
      logout: () => {
        set({ user: null, accessToken: null, isAuth: false });
      },
    }),
    {
      // 로컬 스토리지 키
      name: 'taskify-user-storage',
      // 로컬 스토리지 사용
      storage: createJSONStorage(() => localStorage),
      // 로컬 스토리지 복원 감지
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
