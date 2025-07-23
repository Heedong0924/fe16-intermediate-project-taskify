'use client';

import { useEffect, useState } from 'react';

import { ColorPickerChip } from '@/components/common/Chips';
import { ContentSection } from '@/components/common/ContentSection';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';

type Props = {
  dashboard: { id: number | string; title: string; color: string };
  isLoading: boolean;
  isError: boolean;
  onUpdate: (data: { title: string; color: string }) => void;
};

// 이름바꿔
export default function DashboardUpdate({
  dashboard,
  isLoading,
  isError,
  onUpdate,
}: Props) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (dashboard?.title) {
      setTitle(dashboard.title);
      setColor(dashboard.color);
    }
  }, [dashboard]);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <ContentSection title={title}>
      <Input
        className="mt-[24px]"
        label="대시보드 이름"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ColorPickerChip
        // className="mt-[16px]"
        value={color}
        onChange={setColor}
      />
      <h1>{color}</h1>
      <Button onClick={() => onUpdate({ title, color })}>임시버튼</Button>
    </ContentSection>
  );
}
