import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILikesRepository from '@modules/likes/repositories/ILikesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  post_id: string;
  user_id: string;
}

@injectable()
export default class UpdateLikesService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LikesRepository')
    private likesRepository: ILikesRepository
  ) {}

  public async execute({ user_id, post_id }: IRequest): Promise<Post> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const postFound = await this.postsRepository.findById(post_id);

    if (!postFound) {
      throw new AppError('Post not found');
    }

    const liked = await this.likesRepository.findByIds({
      user_id,
      post_comment_id: post_id,
    });

    if (liked) {
      await this.likesRepository.delete(liked.id);

      postFound.likes -= 1;
    } else {
      await this.likesRepository.create({
        user_id,
        post_comment_id: post_id,
      });

      postFound.likes += 1;
    }

    const updatedPost = await this.postsRepository.save(postFound);

    return updatedPost;
  }
}
