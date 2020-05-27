import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAllPostsService from '@modules/posts/services/ShowAllPostsService';
import CreatePostService from '@modules/posts/services/CreatePostService';

export default class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showAllPosts = container.resolve(ShowAllPostsService);

    const posts = await showAllPosts.execute();

    return response.json(posts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content } = request.body;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      user_id,
      content,
    });

    return response.json(post);
  }
}
