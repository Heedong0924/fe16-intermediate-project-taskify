'use client';

import React from 'react';

import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/Dialog';
import { useDialogStore } from '@/store/dialogStore';

export function GlobalDialog() {
  const { isOpen, dialogComponent, closeDialog } = useDialogStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        {dialogComponent}
      </DialogPortal>
    </Dialog>
  );
}
