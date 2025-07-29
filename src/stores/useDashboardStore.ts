import { create } from 'zustand';

interface DashboardState {
  dashboardId: number | undefined;
  setDashboardId: (id: number) => void;

  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardId: undefined,
  setDashboardId: (id) => set({ dashboardId: id }),

  dashboardTitle: '',
  setDashboardTitle: (title) => set({ dashboardTitle: title }),
}));
