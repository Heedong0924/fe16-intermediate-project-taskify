import axiosInstance from '@/lib/axiosInstance';
import Comment from '@/types/Comment';

export const getComments = async ({
  cardId,
  size = 10,
  cursorId,
}: {
  cardId: number;
  size: number;
  cursorId: number;
}): Promise<[Comment]> => {
  const res = await axiosInstance.get(
    `/comments?cardId=${cardId}&size=${size}&cursorId=${cursorId}`,
  );
  return res.data;
};

export const createComment = async ({
  content,
  cardId,
  columnId,
  dashboardId,
}: {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}): Promise<Comment> => {
  const res = await axiosInstance.post('/comments', {
    content,
    cardId,
    columnId,
    dashboardId,
  });
  return res.data;
};

export const updateComment = async (
  commentId: number,
  content: string,
): Promise<Comment> => {
  const res = await axiosInstance.put(`/comments/${commentId}`, {
    content,
  });
  return res.data;
};

export const deleteComment = async (commentId: number): Promise<Comment> => {
  const res = await axiosInstance.delete(`/comments/${commentId}`);
  return res.data;
};
