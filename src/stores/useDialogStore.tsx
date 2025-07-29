import { ReactNode } from 'react';
import { create } from 'zustand';

import { Dialog } from '@/components/ui/Dialog';

/**
 * @interface DiallogStateContent
 * @description Dialog에서 사용되는 컨텐츠 상태들의 타입 정의
 * @property {ReactNode | null} dialogComponent Dialog 내부에서 작성되는 React.Node (JSX 컴포넌트를 그대로 받음)
 * @property {DialogContentData | null} data? Dialog간 데이터 전송을 위한 간단한 key, value 쌍의 객체
 */
interface DialogStateContent {
  dialogComponent: ReactNode | null;
}

/**
 * @interface DialogState
 * @description useDialogStore
 * @property {boolean} isOpen Dialog의 열림 상태 (false = 닫힘, true = 열림)
 * @property {DialogStateContent[]} stateHistory stateHistory 이전 Dialog의 상태를 stack에 저장하여 callstack 처럼 동작 (히스토리 저장)
 */
interface DialogState extends DialogStateContent {
  isOpen: boolean;
  stateHistory: DialogStateContent[];

  /**
   * @method openDialog Dialog를 활성화하는 액션 함수
   * @param {ReactNode} params.dialogComponent Dialog 내부에 렌더링될 React 컴포넌트 (필수)
   * @param {boolean} params.isNewOpen Dialog를 새로 띄울지를 판별하는 플래그 (중첩 다이얼로그 여부)
   */
  openDialog: (params: {
    dialogComponent: ReactNode;
    isNewOpen?: boolean;
  }) => void;

  /** @method closeDialog Dialog 닫는 액션 함수 */
  closeDialog: () => void;

  /** @method goback 이전 Dialog로 이동하는 액션 함수 */
  goBack: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialogComponent: null,
  stateHistory: [],
  data: null,

  openDialog: ({ dialogComponent, isNewOpen = false }) => {
    set((prev) => {
      const newHistory = {
        isOpen: prev.isOpen,
        dialogComponent: prev.dialogComponent,
      };

      return {
        isOpen: true,
        dialogComponent: !isNewOpen ? (
          dialogComponent
        ) : (
          <>
            {prev.dialogComponent}
            <Dialog open>{dialogComponent}</Dialog>
          </>
        ),
        stateHistory: prev.isOpen
          ? [...prev.stateHistory, newHistory]
          : prev.stateHistory,
      };
    });
  },

  closeDialog: () => {
    set({
      isOpen: false,
      stateHistory: [],
    });
    setTimeout(() => {
      set({
        dialogComponent: null,
      });
    }, 200);
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
        stateHistory: [],
      };
    });
  },
}));
