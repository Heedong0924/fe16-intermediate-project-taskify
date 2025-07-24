'use client';

import { useEffect, useRef, useState } from 'react';

import { ColorPickerChip } from '@/components/common/Chips';
import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';

type Props = {
  dashboard: { id: number | string; title: string; color: string };
  isLoading: boolean;
  onUpdate: (data: { title: string; color: string }) => void;
};

// 값이 공백으로 들어갈 때 처리 하기
export default function DashboardUpdate({
  dashboard,
  isLoading,
  onUpdate,
}: Props) {
  // const [title, setTitle] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState('');

  useEffect(() => {
    if (dashboard?.title) {
      // setTitle(dashboard.title);
      if (titleRef.current) titleRef.current.value = dashboard.title;
      setColor(dashboard.color);
    }
  }, [dashboard]);

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <ContentSection title={dashboard.title}>
      <Input
        className="mt-[24px]"
        label="대시보드 이름"
        // value={dashboard.title}
        ref={titleRef}
        // onChange={(e) => setTitle(e.target.value)}
        // errorMessage="공백이나그런거처리하기"
      />
      <div className="mt-[16px] mb-[40px]">
        <ColorPickerChip value={color} onChange={setColor} />
      </div>
      <Button
        color="violet-white"
        className="h-[54px] w-full"
        // onClick={() => onUpdate({ title, color })}
        onClick={() => {
          const title = titleRef.current?.value ?? '';
          onUpdate({ title, color });
        }}
      >
        변경
      </Button>
    </ContentSection>
  );
}
