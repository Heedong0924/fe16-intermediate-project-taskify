import { ReactNode } from 'react';
import { create } from 'zustand';

interface DialogStateContent {
  isOpen: boolean;
  dialogComponent: ReactNode | null;
  data?: Record<string, unknown> | null;
}

interface DialogState extends DialogStateContent {
  stateHistory: DialogStateContent[];
  openDialog: (params: {
    dialogComponent: ReactNode;
    data?: Record<string, unknown>;
  }) => void;
  closeDialog: () => void;
  goBack: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialogComponent: null,
  stateHistory: [],
  data: null,

  openDialog: ({ dialogComponent, data }) => {
    set((prev) => {
      const newHistory = {
        isOpen: prev.isOpen,
        dialogComponent: prev.dialogComponent,
        data: prev.data,
      };

      return {
        isOpen: true,
        dialogComponent,
        data,
        stateHistory: prev.isOpen
          ? [...prev.stateHistory, newHistory]
          : prev.stateHistory,
      };
    });
  },

  closeDialog: () => {
    set({
      isOpen: false,
      dialogComponent: null,
      data: null,
      stateHistory: [],
    });
  },

  goBack: () => {
    set((prev) => {
      const history = [...prev.stateHistory];
      const lastState = history.pop();

      if (lastState) {
        return {
          ...lastState,
          stateHistory: history,
        };
      }
      return {
        isOpen: false,
        dialogComponent: null,
        data: null,
        stateHistory: [],
      };
    });
  },
}));
