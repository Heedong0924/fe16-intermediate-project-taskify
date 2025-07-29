// export const useTimeAgo = (createdAt: string) => {
//   const created = new Date(createdAt); // KST 자동 변환
//   const now = new Date();

//   const diffMs = now.getTime() - created.getTime();
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//   const diffDays = Math.floor(diffHours / 24);

//   return diffDays >= 1 ? `${diffDays}일 전` : `${diffHours}시간 전`;
// }; axiosInstance 변경시 수정해야함

// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ko } from 'date-fns/locale';

export const useTimeAgo = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  if (createdDate > now) {
    createdDate.setHours(createdDate.getHours() - 9);
  }

  return formatDistanceToNow(createdDate, {
    addSuffix: true,
    locale: ko,
  });
};
