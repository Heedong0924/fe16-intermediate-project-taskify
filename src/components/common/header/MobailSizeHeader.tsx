'use client';

import Image from 'next/image';

import addBox from '@/../public/images/icon/addBox.svg';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useDialogStore } from '@/stores/useDialogStore';

import DashboardCard from '../DashboardCrad';
import CreateDashboardDialog from '../dialog/CreateDashboardDialog';

const MobailSizeHeader = () => {
  const { openDialog } = useDialogStore();
  const { dashboards } = useDashboardStore();

  return (
    <div className="hide-scrollbar bg-taskify-neutral-0 fixed top-15 left-0 z-10 flex h-[60px] w-full items-center gap-1 overflow-x-auto border-b-1 px-3 md:hidden">
      <button
        type="button"
        onClick={() =>
          openDialog({
            dialogComponent: <CreateDashboardDialog />,
          })
        }
        className="hover:bg-taskify-violet-light flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md"
      >
        <Image src={addBox} alt="add dashboard" width={24} height={24} />
      </button>
      <div className="flex items-center gap-2 pr-5">
        {dashboards &&
          dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="hover:bg-taskify-violet-light max-w-40 shrink-0 cursor-pointer rounded-md border-1"
            >
              <DashboardCard dashboard={dashboard} className="w-full" />
            </div>
          ))}
        <div className="h-1 w-3 flex-shrink-0" />
      </div>
    </div>
  );
};

export default MobailSizeHeader;
