import clsx from 'clsx';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

import { AOSProps } from '@/types/AOSProps';

interface SettingCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  imageUrl: string;
  aos?: AOSProps;
}

const SettingCard = ({
  className,
  children,
  title,
  imageUrl,
  aos,
}: SettingCardProps) => {
  return (
    <div
      className={clsx(
        'bg-taskify-neutral-800 max-w-[378px] rounded-sm',
        className,
      )}
      data-aos={aos?.['data-aos']}
      data-aos-offset={aos?.['data-aos-offset']}
      data-aos-delay={aos?.['data-aos-delay']}
      data-aos-duration={aos?.['data-aos-duration']}
      data-aos-easing={aos?.['data-aos-easing']}
      data-aos-mirror={aos?.['data-aos-mirror']}
      data-aos-once={aos?.['data-aos-once']}
      data-aos-anchor-placement={aos?.['data-aos-anchor-placement']}
    >
      <div className="bg-taskify-neutral-700 flex w-full items-center justify-center p-6">
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg">
          <Image
            className="rounded-lg object-contain"
            src={imageUrl}
            alt="Taskify 제공 설정"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, (min-width: 1280px) 33vw"
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-[18px] px-8 py-7 md:py-8">
        <h2 className="text-taskify-2lg-bold">{title}</h2>
        <p className="text-taskify-lg-medium">{children}</p>
      </div>
    </div>
  );
};

export default SettingCard;
