import { create } from 'zustand';

import Column from '@/types/Column';

interface ColumnInfos {
  id: number;
  title: string;
}

interface ColumnState {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
  getColumns: () => Column[];
  getColumnsInfos: () => ColumnInfos[];
}

export const useColumnStore = create<ColumnState>((set, get) => ({
  columns: [],
  setColumns: (newColumns: Column[]) => set({ columns: newColumns }),
  getColumns: () => get().columns,
  getColumnsInfos: () =>
    get().columns.map((e) => {
      return { id: e.id, title: e.title };
    }),
}));
