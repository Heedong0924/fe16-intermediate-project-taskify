export const useTimeAgo = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  // 초대받은 지 하루가 되지 않았다면 0시간 전으로 표기, 하루가 지났다면 지난 날수로 표기
  return diffDays >= 1 ? `${diffDays}일 전` : `${diffHours}시간 전`;
};
