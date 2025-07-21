import Author from './Author';

export default interface Comment {
  id: number;
  content: string;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  cardId: number;
  author: Author;
}
