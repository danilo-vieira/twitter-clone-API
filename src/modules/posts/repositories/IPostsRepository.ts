import Post from '../infra/typeorm/entities/Post';

import ICreatePostDTO from '../dtos/ICreatePostDTO';

export default interface IPostsRepository {
  findOneById(id: string): Promise<Post | undefined>;
  findAllSortedByDate(): Promise<Post[]>;
  findAllByUserId(user_id: string): Promise<Post[]>;
  create({ user_id, content }: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(post: Post): Promise<void>;
}
