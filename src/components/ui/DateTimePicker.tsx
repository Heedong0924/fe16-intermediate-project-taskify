'use client';

import { format, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/Popover';

interface DateTimePickerProps {
  /** 선택된 날짜/시간 (없으면 플레이스홀더) */
  value?: Date;
  /** 날짜/시간이 바뀔 때 호출되는 콜백 */
  onChange: (date?: Date) => void;
  /** 버튼에 표시할 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 버튼에 추가할 클래스네임 */
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = '날짜와 시간을 선택해주세요',
  className,
}: DateTimePickerProps) {
  // 내부에서 시간 문자열(HH:mm) 관리
  const [time, setTime] = React.useState(
    value ? format(value, 'HH:mm') : format(new Date(), 'HH:mm'),
  );

  // 날짜만 바뀌었을 때 이전 시간을 적용
  const handleDateSelect = (date: Date | undefined) => {
    // 선택된 날짜가 없으면 초기화
    if (!date) {
      onChange(undefined);
      return;
    }
    // 선택된 날짜가 오늘보다 이전이면 오늘로 설정
    const [hour, minute] = time.split(':').map(Number);
    const withTime = setMinutes(setHours(date, hour), minute);
    onChange(withTime);
  };

  // 시간만 바뀌었을 때 이전 date를 적용
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (value) {
      const [hour, minute] = newTime.split(':').map(Number);
      const updated = setMinutes(setHours(value, hour), minute);
      onChange(updated);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className={twMerge(
            'data-[empty=true]:text-muted-foreground w-full justify-start px-4 py-3 text-left',
            className,
          )}
        >
          <CalendarIcon className="mr-2" />
          {value ? (
            <>
              {format(value, 'yyyy년 M월 d일 EEEE', { locale: ko })}{' '}
              {format(value, 'HH:mm')}
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto space-y-4 p-4">
        {/* 달력 */}
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          disabled={{ before: new Date() }}
          captionLayout="dropdown"
        />

        {/* 시간 입력 */}
        <div className="flex items-center gap-2">
          <label htmlFor="time-input" className="text-sm whitespace-nowrap">
            시간:
          </label>
          <input
            id="time-input"
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="rounded border px-2 py-1 text-sm"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
