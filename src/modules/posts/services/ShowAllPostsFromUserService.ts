import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

@injectable()
export default class ShowAllPostsFromUserService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(user_id: string): Promise<Post[]> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const posts = await this.postsRepository.findAllByUserId(user_id);

    return posts;
  }
}
