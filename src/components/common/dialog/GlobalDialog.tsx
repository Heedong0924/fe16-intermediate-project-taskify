'use client';

import React from 'react';

import { Dialog } from '@/components/ui/Dialog';
import { useDialogStore } from '@/stores/useDialogStore';

export function GlobalDialog() {
  const { isOpen, dialogComponent, closeDialog } = useDialogStore();

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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {dialogComponent}
    </Dialog>
  );
}
