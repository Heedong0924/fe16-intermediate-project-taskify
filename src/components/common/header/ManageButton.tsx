import Link from 'next/link';
import { LuSettings } from 'react-icons/lu';

import Button from '@/components/ui/Buttons';
import { useDashboardStore } from '@/stores/useDashboardStore';

const ManageButton = () => {
  const { dashboardId } = useDashboardStore();

  // 대시보드 아이디 받아 관리페이지 link 연결
  return (
    <Link href={`/dashboard/${dashboardId}/edit`}>
      <Button
        type="button"
        color="white-black"
        className="h-[30px] w-[49px] px-[12px] py-[6px] md:h-[40px] md:w-[88px] md:px-[16px] md:py-[10px]"
      >
        <div className="text-taskify-md-medium md:text-taskify-lg-medium text-taskify-neutral-500 flex items-center gap-2 text-nowrap">
          <LuSettings className="hidden md:inline" />
          <p>관리</p>
        </div>
      </Button>
    </Link>
  );
};

export default ManageButton;
