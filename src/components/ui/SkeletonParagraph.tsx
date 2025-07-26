import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

import SkeletonLine from './SkeletonLIne';

interface SkeletonLineProps extends HTMLAttributes<HTMLDivElement> {
  lineClassName?: string;
  paragraphClassName?: string;
  lines?: number;
  isFadingOut: boolean;
}

const SkeletonParagraph = ({
  lineClassName = '',
  paragraphClassName = '',
  lines = 3,
  isFadingOut,
}: SkeletonLineProps) => {
  const paragraphLines: ReactNode[] = [];

  for (let i = 0; i < lines; i += 1) {
    paragraphLines.push(
      <SkeletonLine
        key={i}
        className={lineClassName}
        isFadingOut={isFadingOut}
      />,
    );
  }
  return (
    <div className={clsx('flex flex-col justify-around', paragraphClassName)}>
      {paragraphLines}
    </div>
  );
};

export default SkeletonParagraph;
