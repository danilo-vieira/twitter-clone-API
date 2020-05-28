import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  post_id: string;
  user_id: string;
}

@injectable()
export default class ShowOnePostFromUserService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, post_id }: IRequest): Promise<Post> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not found.');
    }

    if (post.user_id !== userFound.id) {
      throw new AppError('This post does not belongs to the user');
    }

    return post;
  }
}
