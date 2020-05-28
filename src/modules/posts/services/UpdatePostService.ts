import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  user_id: string;
  post_id: string;
  content: string;
}

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, post_id, content }: IRequest): Promise<Post> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found.');
    }

    const postFound = await this.postsRepository.findById(post_id);

    if (!postFound) {
      throw new AppError('Post not found.');
    }

    if (postFound.user_id !== userFound.id) {
      throw new AppError("You're not the owner of this post");
    }

    postFound.content = content;

    const updatedPost = await this.postsRepository.save(postFound);

    return updatedPost;
  }
}
