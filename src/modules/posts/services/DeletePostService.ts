import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  user_id: string;
  post_id: string;
}

@injectable()
export default class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, post_id }: IRequest): Promise<void> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const postFound = await this.postsRepository.findOneById(post_id);

    if (!postFound) {
      throw new AppError('Post not found');
    }

    if (postFound.user_id !== userFound.id) {
      throw new AppError('The post does not belongs to this user.');
    }

    await this.postsRepository.delete(postFound);
  }
}
