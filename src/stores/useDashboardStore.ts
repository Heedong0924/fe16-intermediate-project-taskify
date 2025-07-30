import { create } from 'zustand';

interface DashboardState {
  dashboardId: number | undefined;
  setDashboardId: (id: number) => void;

  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;

  createdByMe: boolean;
  setCreatedByMe: (flag: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  dashboardId: undefined,
  setDashboardId: (id) => set({ dashboardId: id }),
  getDashboardId: () => get().dashboardId,

  dashboardTitle: '',
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
  getDashboardTitle: () => get().dashboardTitle,

  createdByMe: false,
  setCreatedByMe: (flag) => set({ createdByMe: flag }),
}));
