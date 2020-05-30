import { uuid } from 'uuidv4';

import Post from '@modules/posts/infra/typeorm/entities/Post';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import IPostsRepository from '../IPostsRepository';

export default class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findById(id: string): Promise<Post | undefined> {
    const postFound = this.posts.find(post => post.id === id);

    return postFound;
  }

  public async findAllSortedByDate(): Promise<Post[]> {
    return this.posts;
  }

  public async findAllByUserId(user_id: string): Promise<Post[]> {
    const postsFound = this.posts.filter(post => post.user_id === user_id);

    return postsFound;
  }

  public async create({ user_id, content }: ICreatePostDTO): Promise<Post> {
    const newPost = new Post();

    Object.assign(newPost, { id: uuid(), user_id, content, likes: 0 });

    this.posts.push(newPost);

    return newPost;
  }

  public async save(post: Post): Promise<Post> {
    const postIndex = this.posts.findIndex(
      postOfArr => postOfArr.id === post.id
    );

    this.posts[postIndex] = post;

    return post;
  }

  public async delete(post: Post): Promise<void> {
    const postIndex = this.posts.findIndex(
      postOfArr => postOfArr.id === post.id
    );

    this.posts.splice(postIndex, 1);
  }
}
