'use client';

import { useEffect } from 'react';

import { useColumnStore } from '@/stores/useColumnStore';
import { useMemberStore } from '@/stores/useMemberStore';
import Column from '@/types/Column';
import { Member } from '@/types/DashboardMember';

const mockMembers: Member[] = [
  {
    id: 1,
    userId: 101,
    email: 'john.doe@example.com',
    nickname: '존도우',
    profileImageUrl: 'https://picsum.photos/id/237/200/300',
    createdAt: '2024-07-25T10:00:00Z',
    updatedAt: '2024-07-25T10:00:00Z',
    isOwner: false,
  },
  {
    id: 2,
    userId: 102,
    email: 'jane.smith@example.com',
    nickname: '제인스미스',
    profileImageUrl: null,
    createdAt: '2024-07-25T10:05:00Z',
    updatedAt: '2024-07-25T10:05:00Z',
    isOwner: false,
  },
  {
    id: 3,
    userId: 103,
    email: 'charlie.brown@example.com',
    nickname: '찰리',
    profileImageUrl: 'https://picsum.photos/id/238/200/300',
    createdAt: '2024-07-25T10:10:00Z',
    updatedAt: '2024-07-25T10:10:00Z',
    isOwner: false,
  },
  {
    id: 4,
    userId: 104,
    email: 'alice.kim@example.com',
    nickname: '앨리스',
    profileImageUrl: null,
    createdAt: '2024-07-25T10:15:00Z',
    updatedAt: '2024-07-25T10:15:00Z',
    isOwner: false,
  },
  {
    id: 5,
    userId: 105,
    email: 'bob.lee@example.com',
    nickname: '보블리',
    profileImageUrl: 'https://picsum.photos/id/239/200/300',
    createdAt: '2024-07-25T10:20:00Z',
    updatedAt: '2024-07-25T10:20:00Z',
    isOwner: false,
  },
  {
    id: 6,
    userId: 106,
    email: 'eve.choi@example.com',
    nickname: '이브',
    profileImageUrl: null,
    createdAt: '2024-07-25T10:25:00Z',
    updatedAt: '2024-07-25T10:25:00Z',
    isOwner: false,
  },
  {
    id: 7,
    userId: 107,
    email: 'david.park@example.com',
    nickname: '데이빗',
    profileImageUrl: 'https://picsum.photos/id/240/200/300',
    createdAt: '2024-07-25T10:30:00Z',
    updatedAt: '2024-07-25T10:30:00Z',
    isOwner: false,
  },
  {
    id: 8,
    userId: 108,
    email: 'grace.han@example.com',
    nickname: '그레이스',
    profileImageUrl: null,
    createdAt: '2024-07-25T10:35:00Z',
    updatedAt: '2024-07-25T10:35:00Z',
    isOwner: false,
  },
  {
    id: 9,
    userId: 109,
    email: 'frank.kim@example.com',
    nickname: '프랭크',
    profileImageUrl: 'https://picsum.photos/id/241/200/300',
    createdAt: '2024-07-25T10:40:00Z',
    updatedAt: '2024-07-25T10:40:00Z',
    isOwner: false,
  },
  {
    id: 10,
    userId: 110,
    email: 'olivia.jung@example.com',
    nickname: '올리비아',
    profileImageUrl: null,
    createdAt: '2024-07-25T10:45:00Z',
    updatedAt: '2024-07-25T10:45:00Z',
    isOwner: false,
  },
];

const mockColumns: Column[] = [
  {
    id: 1,
    title: 'Todo',
    teamId: '16-2',
    createdAt: '2024-07-25T11:00:00Z',
    updatedAt: '2024-07-25T11:00:00Z',
  },
  {
    id: 2,
    title: 'In Progress',
    teamId: '16-2',
    createdAt: '2024-07-25T11:05:00Z',
    updatedAt: '2024-07-25T11:05:00Z',
  },
  {
    id: 3,
    title: 'Code Review',
    teamId: '16-2',
    createdAt: '2024-07-25T11:10:00Z',
    updatedAt: '2024-07-25T11:10:00Z',
  },
  {
    id: 4,
    title: 'Testing',
    teamId: '16-2',
    createdAt: '2024-07-25T11:15:00Z',
    updatedAt: '2024-07-25T11:15:00Z',
  },
  {
    id: 5,
    title: 'Done',
    teamId: '16-2',
    createdAt: '2024-07-25T11:20:00Z',
    updatedAt: '2024-07-25T11:20:00Z',
  },
  {
    id: 6,
    title: 'Blocked',
    teamId: '16-2',
    createdAt: '2024-07-25T11:25:00Z',
    updatedAt: '2024-07-25T11:25:00Z',
  },
  {
    id: 7,
    title: 'Backlog',
    teamId: '16-2',
    createdAt: '2024-07-25T11:30:00Z',
    updatedAt: '2024-07-25T11:30:00Z',
  },
  {
    id: 8,
    title: 'Urgent',
    teamId: '16-2',
    createdAt: '2024-07-25T11:35:00Z',
    updatedAt: '2024-07-25T11:35:00Z',
  },
  {
    id: 9,
    title: 'Feature Request',
    teamId: '16-2',
    createdAt: '2024-07-25T11:40:00Z',
    updatedAt: '2024-07-25T11:40:00Z',
  },
  {
    id: 10,
    title: 'Bug Fix',
    teamId: '16-2',
    createdAt: '2024-07-25T11:45:00Z',
    updatedAt: '2024-07-25T11:45:00Z',
  },
];

const StoreTest = () => {
  // memberStore test
  const { setMembers, getMemberInfos } = useMemberStore();

  // columnStore test
  const { setColumns, getColumnsInfos } = useColumnStore();

  useEffect(() => {
    setMembers(mockMembers);
    setColumns(mockColumns);
  }, [setMembers, setColumns]);

  return (
    <>
      <div>
        멤버 스토어 테스트
        {getMemberInfos().map((e) => (
          <div key={e.id}>
            {e.id}, {e.nickname}, {e.profileImageUrl}
          </div>
        ))}
      </div>
      <br />
      <div>
        컬럼 스토어 테스트
        {getColumnsInfos().map((e) => (
          <div key={e.id}>
            <br />
            {e.id}, {e.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default StoreTest;
