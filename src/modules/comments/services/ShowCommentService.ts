import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICommentsRepository from '../repositories/ICommentsRepository';

import Comment from '../infra/typeorm/entities/Comment';

interface IRequest {
  post_id: string;
  comment_id: string;
}

@injectable()
export default class ListAllCommentsFromPostService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  public async execute({ post_id, comment_id }: IRequest): Promise<Comment> {
    const postFound = await this.postsRepository.findById(post_id);

    if (!postFound) {
      throw new AppError('Post not found');
    }

    const commentFound = await this.commentsRepository.findById(comment_id);

    if (!commentFound) {
      throw new AppError('Comment not found');
    }

    if (commentFound.post_id !== postFound.id) {
      throw new AppError('Comment not exists on this post.');
    }

    return commentFound;
  }
}
