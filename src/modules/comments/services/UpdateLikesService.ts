import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILikesRepository from '@modules/likes/repositories/ILikesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';

import Comment from '../infra/typeorm/entities/Comment';

interface IRequest {
  comment_id: string;
  user_id: string;
}

@injectable()
export default class UpdateLikesService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LikesRepository')
    private likesRepository: ILikesRepository
  ) {}

  public async execute({ user_id, comment_id }: IRequest): Promise<Comment> {
    const commentFound = await this.commentsRepository.findById(comment_id);

    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    if (!commentFound) {
      throw new AppError('Comment not found');
    }

    const liked = await this.likesRepository.findByIds({
      user_id,
      post_comment_id: comment_id,
    });

    if (liked) {
      await this.likesRepository.delete(liked.id);

      commentFound.likes -= 1;
    } else {
      await this.likesRepository.create({
        user_id,
        post_comment_id: comment_id,
      });

      commentFound.likes += 1;
    }

    const updatedComment = await this.commentsRepository.save(commentFound);

    return updatedComment;
  }
}
