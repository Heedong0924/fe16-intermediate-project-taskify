import Image from 'next/image';

import crownIcon from '@/../public/images/icon/crown.svg';

const DashboardHeader = ({
  title,
  color,
  createdByMe,
}: {
  title: string;
  color: string;
  createdByMe: boolean;
}) => (
  // h2 외곽을 hover하더라도 반영될 수 있게 group 처리
  <div className="group flex items-center gap-2 md:self-center lg:mt-4 lg:self-auto">
    {/* 컬러 닷 */}
    <span
      className="size-3 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
    />

    {/* 타이틀. md에서 hover하면 제목 길이가 짧게 축약되며 아바타 출력 */}
    <h2 className="text-taskify-lg-medium text-taskify-neutral-600 max-w-[200px] truncate overflow-hidden md:max-w-[180px] md:group-hover:max-w-[100px] lg:max-w-[100px]">
      {title}
    </h2>

    {/* 자신이 만든 대시보드일 경우 왕관 아이콘 출력 */}
    <div className="shrink-0">
      {createdByMe && (
        <Image
          src={crownIcon}
          alt="owner"
          width={18}
          height={14}
          className="h-[14px] w-[18px]"
          priority={false}
        />
      )}
    </div>
  </div>
);

export default DashboardHeader;
