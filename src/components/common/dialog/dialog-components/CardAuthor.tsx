import React, { HTMLAttributes } from 'react';

import { AvatarProfile } from '../../Profile';

interface CardAuthorProps extends HTMLAttributes<HTMLDivElement> {
  author?: string;
  dueDate?: string;
}

export const formattedDate = (str: string) => {
  const date = new Date(str);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24시간 형식 (오전/오후 없음)
  }).format(date);
};

const CardAuthor = ({ className, author, dueDate }: CardAuthorProps) => {
  const baseStyles = 'grid px-4 py-2 text-left';
  const combinedClassName = `${baseStyles} ${className}`;
  const colHeaderFtStyles = 'text-taskify-xs-semibold text-taskify-neutral-900';
  const cellFtStyles = 'text-taskify-neutral-700 text-taskify-xs-normal';

  return (
    <div className={combinedClassName}>
      <span className={`${colHeaderFtStyles} + col-start-1 col-end-2`}>
        담당자
      </span>
      <span className={`${colHeaderFtStyles} + col-start-2 col-end-3`}>
        마감일
      </span>
      <div className="flex items-center gap-2">
        <AvatarProfile userName={author || ''} size="sm" />
        <span className={cellFtStyles}>{author}</span>
      </div>
      <div className={`${cellFtStyles} flex self-center`}>
        {dueDate && formattedDate(dueDate)}
      </div>
    </div>
  );
};

export default CardAuthor;
