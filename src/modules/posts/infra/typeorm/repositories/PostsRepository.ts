import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

import Post from '../entities/Post';

export default class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findById(id: string): Promise<Post | undefined> {
    const postFound = await this.ormRepository.findOne(id);

    return postFound;
  }

  public async findAllByUserId(user_id: string): Promise<Post[]> {
    const postsFound = await this.ormRepository.find({
      where: { user_id },
    });

    return postsFound;
  }

  public async findAllSortedByDate(): Promise<Post[]> {
    const postsFound = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });

    return postsFound;
  }

  public async create({ user_id, content }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      user_id,
      content,
    });

    const createdPost = await this.ormRepository.save(post);

    return createdPost;
  }

  public async save(post: Post): Promise<Post> {
    const updatedPost = await this.ormRepository.save(post);

    return updatedPost;
  }

  public async delete(post: Post): Promise<void> {
    await this.ormRepository.remove(post);
  }
}
