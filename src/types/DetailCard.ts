import Assignee from './Assignee';

export default interface DetailCard {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
}
export interface DetailCardResponse {
  cursorId: number;
  totalCount: number;
  cards: DetailCard[];
  pageParam: number;
}

export interface DetailCardProps {
  size: number;
  cursorId?: number;
  columnId: number;
}
