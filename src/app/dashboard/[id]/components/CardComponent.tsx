'use client';

import Image from 'next/image';

import { TagChip } from '@/components/common/Chips';
import DetailCard from '@/types/DatailCard';

const CardComponent = ({ card }: { card: DetailCard }) => {
  return (
    <div className="bg-taskify-neutral-0 border-taskify-neutral-300 hover:bg-taskify-neutral-200 my-4 cursor-pointer rounded-lg border-1 p-4">
      {card.imageUrl && <Image src={card.imageUrl} alt="카드 이미지" />}
      <span>{card.title}</span>
      <div className="flex">
        {card.tags && card.tags.map((tag) => <TagChip>{tag}</TagChip>)}
      </div>
      <div>
        <span>{card.dueDate}</span>
        <Image src={card.assignee.profileImageUrl} alt="작성자 프로필 이미지" />
      </div>
    </div>
  );
};

export default CardComponent;
