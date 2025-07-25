import axiosInstance from '@/lib/axiosInstance';
import DetailCard, {
  DetailCardProps,
  DetailCardResponse,
} from '@/types/DatailCard';

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

export const getCardList = async (
  params: DetailCardProps,
): Promise<DetailCardResponse> => {
  const requestParams: { size: number; columnId: number; cursorId?: number } = {
    size: params.size,
    columnId: params.columnId,
  };

  if (params.cursorId !== 0) {
    requestParams.cursorId = params.cursorId;
  }
  const res = await axiosInstance.get<DetailCardResponse>('/cards', {
    params: requestParams,
  });
  return res.data;
};
