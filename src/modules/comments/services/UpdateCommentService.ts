import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';

import Comment from '../infra/typeorm/entities/Comment';

interface IRequest {
  comment_id: string;
  user_id: string;
  content: string;
}

@injectable()
export default class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    comment_id,
    user_id,
    content,
  }: IRequest): Promise<Comment> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const commentFound = await this.commentsRepository.findById(comment_id);

    if (!commentFound) {
      throw new AppError('Comment not found');
    }

    if (commentFound.user_id !== userFound.id) {
      throw new AppError('The comment does not belongs to this user.');
    }

    commentFound.content = content;

    const updatedComment = await this.commentsRepository.save(commentFound);

    return updatedComment;
  }
}
