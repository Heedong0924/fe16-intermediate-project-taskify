import DetailCard from '@/types/DetailCard';

// 더미 prop 데이터(나중에 제거)
export const MOCK_CARD_DATA: DetailCard = {
  id: 0,
  columnId: 0,
  title: '주간 회의',
  description: '스프린트 아젠다 회의',
  tags: ['프로젝트', '일반', '긴급', '회의'],
  dueDate: '',
  assignee: {
    profileImageUrl: '',
    nickname: '홍길동',
    id: 0,
  },
  imageUrl: '',
  teamId: '16-2',
  createdAt: '2025-07-25T19:08:01.610Z',
  updatedAt: '2025-07-25T19:08:01.610Z',
};
