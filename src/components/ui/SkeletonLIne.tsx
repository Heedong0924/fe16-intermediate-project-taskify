import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface SkeletonLineProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isFadingOut: boolean;
}

const SkeletonLine = ({
  className = '',
  isFadingOut = false,
}: SkeletonLineProps) => (
  <div
    className={clsx(
      'bg-taskify-neutral-300 animate-pulse rounded-4xl',
      className,
      {
        'opacity-0 transition-opacity duration-300': isFadingOut,
        'animate-pulse': !isFadingOut,
      },
    )}
  />
);

export default SkeletonLine;
