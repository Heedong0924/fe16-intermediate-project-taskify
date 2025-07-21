import Dashboard from '@/types/Dashboard';

interface DashboardResponse {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
}

export const mockDashboardData = async (): Promise<DashboardResponse> => {
  // 실제 API 호출 대신 목 데이터를 반환
  // Promise.resolve를 사용하여 비동기 함수처럼 동작하게 합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cursorId: 10,
        totalCount: 10,
        dashboards: [
          {
            id: 1,
            title: '업무 관리 대시보드',
            color: '#7AC555',
            createdAt: '2025-07-15T10:00:00.000Z',
            updatedAt: '2025-07-15T10:00:00.000Z',
            createdByMe: true,
            userId: 101,
          },
          {
            id: 2,
            title: '개인 프로젝트 현황',
            color: '#F06A6A',
            createdAt: '2025-07-16T11:30:00.000Z',
            updatedAt: '2025-07-16T11:30:00.000Z',
            createdByMe: false,
            userId: 102,
          },
          {
            id: 3,
            title: '팀 스크럼 보드',
            color: '#5E76F3',
            createdAt: '2025-07-17T14:15:00.000Z',
            updatedAt: '2025-07-17T14:15:00.000Z',
            createdByMe: true,
            userId: 101,
          },
          {
            id: 4,
            title: '영업 실적 분석',
            color: '#FFC299',
            createdAt: '2025-07-18T09:45:00.000Z',
            updatedAt: '2025-07-18T09:45:00.000Z',
            createdByMe: false,
            userId: 103,
          },
          {
            id: 5,
            title: '마케팅 캠페인',
            color: '#9A3B3B',
            createdAt: '2025-07-19T16:00:00.000Z',
            updatedAt: '2025-07-19T16:00:00.000Z',
            createdByMe: true,
            userId: 101,
          },
          {
            id: 6,
            title: '리서치 자료 정리',
            color: '#ADD8E6',
            createdAt: '2025-07-20T08:00:00.000Z',
            updatedAt: '2025-07-20T08:00:00.000Z',
            createdByMe: false,
            userId: 104,
          },
          {
            id: 7,
            title: '신규 기능 개발',
            color: '#6B4C8C',
            createdAt: '2025-07-21T11:00:00.000Z',
            updatedAt: '2025-07-21T11:00:00.000Z',
            createdByMe: true,
            userId: 101,
          },
          {
            id: 8,
            title: '회의록 아카이브',
            color: '#FFD700',
            createdAt: '2025-07-22T09:30:00.000Z',
            updatedAt: '2025-07-22T09:30:00.000Z',
            createdByMe: false,
            userId: 105,
          },
          {
            id: 9,
            title: '백엔드 개발 현황',
            color: '#3CB371',
            createdAt: '2025-07-23T13:45:00.000Z',
            updatedAt: '2025-07-23T13:45:00.000Z',
            createdByMe: true,
            userId: 101,
          },
          {
            id: 10,
            title: '버그 트래킹 보드',
            color: '#FFA07A',
            createdAt: '2025-07-24T10:20:00.000Z',
            updatedAt: '2025-07-24T10:20:00.000Z',
            createdByMe: false,
            userId: 106,
          },
        ],
      });
    }, 500);
  });
};
