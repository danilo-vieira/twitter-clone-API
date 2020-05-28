import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateCommentDTO from '@modules/comments/dtos/ICreateCommentDTO';
import Comment from '../entities/Comment';

export default class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async findById(id: string): Promise<Comment | undefined> {
    const commentFound = await this.ormRepository.findOne(id);

    return commentFound;
  }

  public async findAllByPostId(post_id: string): Promise<Comment[]> {
    const commentsFound = await this.ormRepository.find({
      where: { post_id },
    });

    return commentsFound;
  }

  public async create({
    user_id,
    post_id,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.ormRepository.create({
      user_id,
      post_id,
      content,
    });

    const createdComment = await this.ormRepository.save(comment);

    return createdComment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const updatedComment = await this.ormRepository.save(comment);

    return updatedComment;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
