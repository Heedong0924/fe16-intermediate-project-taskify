// src/components/ColumnSelector.tsx

'use client';

import Image from 'next/image';
import React from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { useMemberStore } from '@/stores/useMemberStore';
import type Assignee from '@/types/Assignee';

interface UserSelectorProps {
  /** 현재 선택된 User 의 정보 */
  assignee?: Assignee;
  /** 선택이 바뀔 때 호출됩니다. id (number) 로 전달 */
  onChange: (assigneeUserId: number) => void;
  /** 선택된 User 가 없을 때 표시할 placeholder */
  placeholder?: string;
  /** 추가적인 클래스 이름 */
  className?: string;
}

export const UserSelector = ({
  assignee,
  onChange,
  placeholder,
  className,
}: UserSelectorProps) => {
  // 스토어에서 User 리스트 가져오기
  const users = useMemberStore((state) => state.getMembers());

  return (
    <div className={className}>
      <label
        htmlFor="column-selector"
        className="block text-sm font-medium text-gray-700"
      >
        담당자
      </label>
      <Select
        // Select 컴포넌트는 string 만 다루므로 toString()/parseInt() 로 변환
        value={assignee?.id.toString() ?? ''}
        onValueChange={(val) => onChange(parseInt(val, 10))}
      >
        <SelectTrigger className="w-full">
          {/* 현재 선택값이 있으면 Chip, 없으면 placeholder */}
          {assignee ? (
            <div className="flex items-center gap-3">
              {assignee.profileImageUrl ? (
                <Image
                  src={assignee.profileImageUrl}
                  alt={assignee.nickname}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="h-6 w-6 rounded-full bg-gray-100" />
              )}
              <span>{assignee.nickname}</span>
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>

        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              <div className="flex items-center gap-3">
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.nickname}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-100" />
                )}
                <span>{user.nickname}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
