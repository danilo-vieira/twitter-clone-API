import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  comment_id: string;
  user_id: string;
}

@injectable()
export default class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ comment_id, user_id }: IRequest): Promise<void> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const commentFound = await this.commentsRepository.findById(comment_id);

    if (!commentFound) {
      throw new AppError('Comment not found');
    }

    const postFound = await this.postsRepository.findById(commentFound.post_id);

    if (!postFound) {
      throw new AppError('Post not found');
    }

    if (commentFound.user_id !== userFound.id) {
      if (postFound.user_id !== userFound.id) {
        throw new AppError('Unable to delete this comment');
      }
    }

    await this.commentsRepository.delete(comment_id);
  }
}
