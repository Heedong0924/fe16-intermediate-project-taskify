// src/components/ColumnSelector.tsx

'use client';

import React from 'react';

import { StatusChip } from '@/components/common/Chips';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { useColumnStore } from '@/stores/useColumnStore';

interface ColumnSelectorProps {
  /** 현재 선택된 Column 의 id */
  columnId: number;
  /** 선택이 바뀔 때 호출됩니다. id (number) 로 전달 */
  onChange: (columnId: number) => void;
  placeholder?: string;
  className?: string;
}

export function ColumnSelector({
  columnId,
  onChange,
  placeholder = '상태 선택',
  className,
}: ColumnSelectorProps) {
  // 스토어에서 Column 리스트 가져오기

  const columns = useColumnStore((state) => state.getColumns());
  console.log('ColumnSelector columns:', columns);
  // 현재 선택된 id 에 해당하는 title 찾기
  const current = columns.find((column) => column.id === columnId);
  console.log('ColumnSelector current:', current);
  if (!columns && columnId) {
    console.warn(
      'Store에서 카드의 columnId에 해당하는 Column을 찾을 수 없습니다:',
      columnId,
    );
  }
  return (
    <div className={className}>
      <label
        htmlFor="column-selector"
        className="block text-sm font-medium text-gray-700"
      >
        상태
      </label>
      <Select
        // Select 컴포넌트는 string 만 다루므로 toString()/parseInt() 로 변환
        value={columnId.toString()}
        onValueChange={(val) => onChange(parseInt(val, 10))}
      >
        <SelectTrigger className="w-full">
          {/* 현재 선택값이 있으면 Chip, 없으면 placeholder */}
          {current ? (
            <StatusChip size="sm">{current.title}</StatusChip>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>

        <SelectContent>
          {columns.map((column) => (
            <SelectItem key={column.id} value={column.id.toString()}>
              <StatusChip size="sm">{column.title}</StatusChip>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
