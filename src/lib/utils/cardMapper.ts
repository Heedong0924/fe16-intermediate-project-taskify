import type Assignee from '@/types/Assignee';
import DetailCard from '@/types/DetailCard';
import { TodoFormData } from '@/types/TodoFormData';
// API 카드 데이터를 폼 데이터로 변환하는 함수
export function mapCardToForm(data: DetailCard): TodoFormData {
  const {
    columnId,
    assignee: { id: assigneeUserId },
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  } = data;

  return {
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  };
}

// prop 카드 데이터에서 assignee 정보를 추출하는 함수
export function getAssigneeFromCard(
  cardData?: DetailCard,
): Assignee | undefined {
  return cardData?.assignee;
}
