import clsx from 'clsx';
import Image from 'next/image';
import { HTMLAttributes, ReactNode } from 'react';

import { AOSProps } from '@/types/AOSProps';

interface PointCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  pointNum: number;
  imageUrl?: string;
  imagePosition: 'bottom-right' | 'bottom';
  aos?: AOSProps;
}

const PointCard = ({
  className,
  children,
  pointNum,
  imageUrl = '',
  imagePosition,
  aos,
}: PointCardProps) => {
  let imageSizes;
  if (imagePosition === 'bottom-right') {
    imageSizes = `
      (max-width: 767px) 86vw,
      (max-width: 1279px) 60vw,
      (min-width: 1280px) 45vw
    `;
  } else if (imagePosition === 'bottom') {
    imageSizes = `
      (max-width: 767px) 63vw,
      (max-width: 1279px) 38vw,
      (min-width: 1280px) 36vw
    `;
  }

  return (
    <div
      className={clsx(
        'bg-taskify-neutral-800 flex flex-col items-center rounded-sm xl:grid xl:grid-cols-2 xl:pt-21',
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
      <div
        className={clsx(
          'my-15 mb-48 text-center md:mt-16 md:mb-0 md:self-start md:px-15 md:text-left xl:my-0 xl:mb-56 xl:self-end',
          pointNum % 2 === 0 && 'xl:order-2',
        )}
      >
        <h2 className="text-taskify-2lg-medium text-taskify-neutral-400 mb-15 md:mb-25 md:text-[1.375rem] md:leading-6.5">
          Point {pointNum}
        </h2>
        <h2 className="text-taskify-neutral-0 text-4xl leading-12.5 font-bold md:mb-55 md:text-5xl md:leading-16 xl:mb-0">
          {children}
        </h2>
      </div>
      <div
        className={clsx(
          'relative',
          imagePosition === 'bottom-right' &&
            'aspect-39/32 w-[86%] self-end md:w-[78%] xl:w-full',
          imagePosition === 'bottom' &&
            'aspect-72/83 w-[63%] md:w-[54%] xl:ml-[9%] xl:w-[72%] xl:self-end',
          pointNum % 2 === 0 && 'xl:order-1',
        )}
      >
        <Image
          className={clsx(
            'object-cover',
            imagePosition === 'bottom-right' && 'rounded-tl-lg rounded-br-lg',
            imagePosition === 'bottom' && 'rounded-tl-lg rounded-tr-lg',
          )}
          src={imageUrl}
          alt={`Taskify 포인트 ${pointNum}`}
          fill
          sizes={imageSizes}
          priority={pointNum === 1}
        />
      </div>
    </div>
  );
};

export default PointCard;
