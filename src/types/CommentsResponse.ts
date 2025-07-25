import Comment from './Comment.types';

export default interface CommentsResponse {
  cursorId: number;
  comments: Comment[];
}
