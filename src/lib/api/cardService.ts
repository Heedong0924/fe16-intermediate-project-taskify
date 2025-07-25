import axiosInstance from '@/lib/axiosInstance';
import DetailCard from '@/types/DatailCard';

export const getCard = async (cardId: number): Promise<DetailCard> => {
  const res = await axiosInstance.get(`/cards/${cardId}`);
  return res.data;
};

export const createCard = async ({
  columnId,
  assigneeUserId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: [string];
  imageUrl: string;
}): Promise<DetailCard> => {
  const res = await axiosInstance.post(`/cards}`, {
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });
  return res.data;
};

export const updateCard = async (
  cardId: number,
  {
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  }: {
    columnId: number;
    assigneeUserId: number;
    title: string;
    description: string;
    dueDate: string;
    tags: [string];
    imageUrl: string;
  },
): Promise<DetailCard> => {
  const res = await axiosInstance.put(`/cards/${cardId}`, {
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });
  return res.data;
};

export const deleteCard = async (cardId: number): Promise<DetailCard> => {
  const res = await axiosInstance.delete(`/cards/${cardId}`);
  return res.data;
};
