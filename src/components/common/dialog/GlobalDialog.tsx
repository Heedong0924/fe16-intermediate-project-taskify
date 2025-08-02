'use client';

import React, { useEffect } from 'react';

import { Dialog } from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';

export function GlobalDialog() {
  const {
    isOpen,
    dialogComponent,
    closeDialog,
    popStateGoBack,
    popStateCloseDialog,
    goBack,
  } = useDialogStore();

  /**
   * 다이얼로그의 열림 상태 변경을 처리
   * 닫기 버튼, 모달 외부 클릭 등이 열림 상태의 변경 트리거가 됨
   * @param open 현재 다이얼로그 열림 상태 (true: 열림, false: 닫힘)
   */
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.isDialog) {
        popStateGoBack();
      } else {
        // e.state가 null이면 popStateCloseDialog를 호출
        popStateCloseDialog();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [popStateGoBack, popStateCloseDialog, goBack]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {dialogComponent}
    </Dialog>
  );
}
