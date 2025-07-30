import React, { HTMLAttributes } from 'react';

import { formattedDate } from '@/lib/utils/fotmattedDate';

import { AvatarProfile } from '../../components/common/Profile';

interface CardAuthorProps extends HTMLAttributes<HTMLDivElement> {
  author?: string;
  dueDate?: string;
}

const CardAuthor = ({ className, author, dueDate }: CardAuthorProps) => {
  const baseStyles =
    'grid px-4 py-2 text-left grid-cols-2 grid-rows-[min-content_auto] gap-x-4 gap-y-2';

  const mdGridStyles =
    'md:grid-cols-1 md:grid-rows-[min-content_auto_min-content_auto] md:gap-x-0 md:gap-y-2';

  const combinedClassName = `${baseStyles} ${mdGridStyles} ${className}`;
  const colHeaderFtStyles =
    'text-taskify-xs-semibold md:text-taskify-md-semibold text-taskify-neutral-900';
  const cellFtStyles =
    'text-taskify-neutral-700 text-taskify-xs-normal md:text-taskify-md-regular';

  return (
    <div className={combinedClassName}>
      <span
        className={`${colHeaderFtStyles} col-start-1 col-end-2 row-start-1 row-end-2 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2`}
      >
        담당자
      </span>
      <span
        className={`${colHeaderFtStyles} col-start-2 col-end-3 row-start-1 row-end-2 md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4`}
      >
        마감일
      </span>

      <div className="col-start-1 col-end-2 row-start-2 row-end-3 flex items-center gap-2 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3">
        <AvatarProfile userName={author || ''} size="sm" />
        <span className={cellFtStyles}>{author}</span>
      </div>
      <div
        className={`${cellFtStyles} col-start-2 col-end-3 row-start-2 row-end-3 flex self-center md:col-start-1 md:col-end-2 md:row-start-4 md:row-end-5`}
      >
        {dueDate && formattedDate(dueDate)}
      </div>
    </div>
  );
};

export default CardAuthor;
