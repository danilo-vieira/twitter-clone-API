import { uuid } from 'uuidv4';

import Comment from '@modules/comments/infra/typeorm/entities/Comment';

import ICreateCommentDTO from '@modules/comments/dtos/ICreateCommentDTO';
import ICommentsRepository from '../ICommentsRepository';

export default class FakeCommentsRepository implements ICommentsRepository {
  private comments: Comment[];

  constructor() {
    this.comments = [];
  }

  public async findById(comment_id: string): Promise<Comment | undefined> {
    const commentFound = this.comments.find(
      comment => comment.id === comment_id
    );

    return commentFound;
  }

  public async findAllByPostId(post_id: string): Promise<Comment[]> {
    const commentsFound = this.comments.filter(
      comment => comment.post_id === post_id
    );

    return commentsFound;
  }

  public async create({
    user_id,
    post_id,
    content,
  }: ICreateCommentDTO): Promise<Comment> {
    const newComment = new Comment();

    Object.assign(newComment, {
      id: uuid(),
      user_id,
      post_id,
      content,
    });

    this.comments.push(newComment);

    return newComment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const commentIndex = this.comments.findIndex(
      commentOfArr => commentOfArr.id === comment.id
    );

    this.comments[commentIndex] = comment;

    return comment;
  }

  public async delete(comment_id: string): Promise<void> {
    const commentIndex = this.comments.findIndex(
      commentOfArr => commentOfArr.id === comment_id
    );

    this.comments.splice(commentIndex, 1);
  }
}
