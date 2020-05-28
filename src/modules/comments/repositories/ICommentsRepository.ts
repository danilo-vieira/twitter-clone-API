import Comment from '../infra/typeorm/entities/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

export default interface ICommentsRepository {
  findById(comment_id: string): Promise<Comment | undefined>;
  findAllByPostId(post_id: string): Promise<Comment[]>;
  create({ user_id, post_id, content }: ICreateCommentDTO): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  delete(comment_id: string): Promise<void>;
}
