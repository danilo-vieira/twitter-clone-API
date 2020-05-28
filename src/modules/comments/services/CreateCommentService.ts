import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';

import Comment from '../infra/typeorm/entities/Comment';

interface IRequest {
  post_id: string;
  user_id: string;
  content: string;
}

@injectable()
export default class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    post_id,
    content,
  }: IRequest): Promise<Comment> {
    const userFound = await this.usersRepository.findById(user_id);

    if (!userFound) {
      throw new AppError('User not found');
    }

    const postFound = await this.postsRepository.findById(post_id);

    if (!postFound) {
      throw new AppError('Post not found');
    }

    const createdComment = await this.commentsRepository.create({
      user_id,
      post_id,
      content,
    });

    return createdComment;
  }
}
