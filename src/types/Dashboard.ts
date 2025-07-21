export default interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
  createdByMe: boolean;
  userId: number;
}
