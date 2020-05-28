import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';

import Comment from '../infra/typeorm/entities/Comment';

@injectable()
export default class ListAllCommentsFromPostService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  public async execute(post_id: string): Promise<Comment[]> {
    const postFound = await this.postsRepository.findById(post_id);

    if (!postFound) {
      throw new AppError('Post not found');
    }

    const commentsFound = await this.commentsRepository.findAllByPostId(
      post_id
    );

    return commentsFound;
  }
}
