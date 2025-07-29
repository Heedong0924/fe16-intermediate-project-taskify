// 카드 수정 및 생성에 사용할 폼 데이터 타입 정의
export type TodoFormData = {
  assigneeUserId: number;
  dashboardId?: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl: string | null;
};
