import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  user_id: string;
  content: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, content }: IRequest): Promise<Post> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found.');
    }

    const post = await this.postsRepository.create({
      user_id,
      content,
    });

    return post;
  }
}
