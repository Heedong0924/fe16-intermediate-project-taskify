'use client';

import { FaPlus } from 'react-icons/fa6';

import CreateDashboardDialog from '@/components/common/dialog/CreateDashboardDialog';
import { useDialogStore } from '@/stores/useDialogStore';

const NewDashboardCard = () => {
  const { openDialog } = useDialogStore();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openDialog({ dialogComponent: <CreateDashboardDialog /> })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openDialog({ dialogComponent: <CreateDashboardDialog /> });
        }
      }}
      className="order-0 flex min-h-[58px] w-full max-w-[290px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 transition hover:shadow-sm md:min-h-[68px] md:w-full md:max-w-[275px] lg:min-h-[165px] lg:w-[165px]"
    >
      <div className="flex flex-row items-center gap-2 md:flex-row lg:flex-col">
        <FaPlus className="text-taskify-neutral-400 h-[15px] w-[15px] md:h-[18px] md:w-[18px] lg:h-[35px] lg:w-[35px]" />
        <p className="text-taskify-md-regular md:text-taskify-sm-medium sm:text-taskify-xs-normal text-taskify-neutral-400 whitespace-nowrap">
          새로운 대시보드
        </p>
      </div>
    </div>
  );
};

export default NewDashboardCard;
