export default interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  updatedAt: string; // ISO 8601 형식의 날짜 문자열
}

export interface ColumnResponse {
  result: string;
  data: Column[];
}
