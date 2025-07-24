'use client';

import { useState } from 'react';

import {
  AddCountChip,
  CounterChip,
  StatusChip,
  TagChip,
  ColorPickerChip,
} from '@/components/common/Chips';
import { AvatarProfile, UserProfile } from '@/components/common/Profile';

function Test() {
  const [color, setColor] = useState('#FFA500');

  return (
    <div>
      <h1 className="text-2xl font-bold">프로필 공통 컴포넌트</h1>
      <h2 className="text-xl font-bold">UserProfile (아바타 + 이름)</h2>
      <UserProfile profileImg="https://github.com/shadcn.png" userName="유저" />
      <UserProfile profileImg="잘못된주소" userName="홍길동" />
      <UserProfile profileImg="" userName="김민수" />
      <UserProfile userName="kara" />
      <h1 className="text-xl font-bold">AvatarProfile (아바타)</h1>
      <p>
        영어 이름에 경우 대문자로 나옵니다. <br /> 색상은 랜덤
      </p>
      <AvatarProfile userName="박연희" />
      <AvatarProfile userName="2팀" />
      <AvatarProfile userName="Alice" />
      <hr />
      <h1 className="text-2xl font-bold">chip 공통 컴포넌트</h1>
      <h2 className="text-xl font-bold">AddCountChip</h2>
      <AddCountChip size="md" />
      <AddCountChip size="sm" />
      <h2 className="text-xl font-bold">CounterChip</h2>
      <CounterChip>3</CounterChip>
      <h2 className="text-xl font-bold">StatusChip</h2>
      <div>
        <StatusChip size="sm">To Do</StatusChip>
        <StatusChip size="sm">On Progress</StatusChip>
        <StatusChip size="sm">Done</StatusChip>
      </div>
      <div>
        <StatusChip size="md">To Do</StatusChip>
        <StatusChip size="md">On Progress</StatusChip>
        <StatusChip size="md">Done</StatusChip>
      </div>
      <h2 className="text-xl font-bold">TagChip</h2>
      <div>
        <TagChip size="sm">프로젝트</TagChip>
        <TagChip size="sm">일반</TagChip>
      </div>
      <div>
        <TagChip size="md">2팀</TagChip>
        <TagChip size="md">TagChip</TagChip>
      </div>
      <h2 className="text-xl font-bold">ColorPickerChip</h2>
      <ColorPickerChip size="sm" value={color} onChange={setColor} />
      <ColorPickerChip size="md" value={color} onChange={setColor} />
    </div>
  );
}

export default Test;
