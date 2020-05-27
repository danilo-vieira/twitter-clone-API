import { injectable, inject } from 'tsyringe';

import IPostsRepository from '../repositories/IPostsRepository';

import Post from '../infra/typeorm/entities/Post';

@injectable()
export default class ShowOnePostFromUserService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  public async execute(): Promise<Post[]> {
    const postsFound = await this.postsRepository.findAllSortedByDate();

    return postsFound;
  }
}
