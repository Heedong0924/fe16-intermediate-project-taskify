import clsx from 'clsx';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface SettingCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  imageUrl: string;
}

const SettingCard = ({
  className,
  children,
  title,
  imageUrl,
}: SettingCardProps) => {
  return (
    <div
      className={clsx(
        'bg-taskify-neutral-800 max-w-[378px] rounded-sm',
        className,
      )}
    >
      <div className="relative aspect-3/2 w-full">
        <Image
          className="rounded-t-lg object-cover"
          src={imageUrl}
          alt="Taskify 제공 설정"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, (min-width: 1280px) 33vw"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-[18px] px-8 py-7 md:py-8">
        <h2 className="text-taskify-2lg-bold">{title}</h2>
        <p className="text-taskify-lg-medium">{children}</p>
      </div>
    </div>
  );
};

export default SettingCard;
