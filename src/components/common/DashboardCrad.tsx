import Image from 'next/image';
import Link from 'next/link';

import crownIcon from '@/../public/images/icon/crown.svg';
import { Dashboard } from '@/types/Dashboard';

type DashboardCardProps = {
  dashboard: Dashboard;
  className?: string;
};

const DashboardCard = ({
  dashboard,
  className, // width height font 는 직접 지정, 근데 사이즈는 부모요소 따라가서 h-만 주면 될 듯
}: DashboardCardProps) => {
  const baseStyle =
    'flex items-center justify-between px-[10px] py-[7px] transition-all duration-20';
  const allClass = `${baseStyle} ${className || ''}`;

  return (
    <Link
      key={dashboard.id}
      href={`/dashboard/${dashboard.id}`}
      className={allClass}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="bg- h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: dashboard.color }}
        />
        <div className="flex min-w-0 gap-1">
          <span className="text-taskify-lg-medium overflow-hidden text-ellipsis whitespace-nowrap">
            {dashboard.title}
          </span>
          {dashboard.createdByMe && (
            <Image src={crownIcon} alt="crown icon - createByMe" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
