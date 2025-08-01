// src/components/ColumnSelector.tsx

'use client';

import React from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { useMemberStore } from '@/stores/useMemberStore';
import { Member } from '@/types/DashboardMember';

import { AvatarProfile } from '../../Profile';

interface UserSelectorProps {
  /** 현재 선택된 User 의 정보 */
  assigneeUserId?: number;
  /** 선택이 바뀔 때 호출됩니다. id (number) 로 전달 */
  onChange: (assigneeUserId: number) => void;
  /** 선택 변경 후 감지 */
  onBlur?: () => void;
  /** 선택된 User 가 없을 때 표시할 placeholder */
  placeholder?: string;
  /** 추가적인 클래스 이름 */
  className?: string;
}

export const UserSelector = ({
  assigneeUserId,
  onChange,
  onBlur,
  placeholder,
  className,
}: UserSelectorProps) => {
  // 스토어에서 User 리스트 가져오기
  const users: Member[] = useMemberStore((state) => state.getMembers());
  // const users = mockMembers;

  const selected = users.find((user) => user.userId === assigneeUserId);
  // todo: 선택된 User 가 없을 때의 처리
  if (!selected && assigneeUserId) {
    console.warn(
      'Store에서 카드의 assigneeUserId에 해당하는 User를 찾을 수 없습니다 : ',
      assigneeUserId,
    );
  }

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
        value={selected?.userId.toString() ?? ''}
        onValueChange={(val) => onChange(parseInt(val, 10))}
      >
        <SelectTrigger className="w-full" onBlur={onBlur}>
          {/* 현재 선택값이 있으면 Chip, 없으면 placeholder */}
          {selected ? (
            <div className="flex items-center gap-3">
              <AvatarProfile
                profileImg={selected.profileImageUrl}
                userName={selected.nickname}
                size="sm"
                isBorder={false}
              />
              <span>{selected.nickname}</span>
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>

        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.userId} value={user.userId.toString()}>
              <div className="flex items-center gap-3">
                <AvatarProfile
                  profileImg={user.profileImageUrl}
                  userName={user.nickname}
                  size="sm"
                  isBorder={false}
                />
                <span>{user.nickname}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
