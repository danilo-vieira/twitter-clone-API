import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowAllPostsFromUserService from '@modules/posts/services/ShowAllPostsFromUserService';
import ShowOnePostFromUserService from '@modules/posts/services/ShowOnePostFromUserService';
import UpdatePostService from '@modules/posts/services/UpdatePostService';
import DeletePostService from '@modules/posts/services/DeletePostService';

export default class UserPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const showAllPostsFromUser = container.resolve(ShowAllPostsFromUserService);

    const posts = await showAllPostsFromUser.execute(userId);

    return response.json(classToClass(posts));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { postId, userId } = request.params;

    const showOnePostFromUser = container.resolve(ShowOnePostFromUserService);

    const post = await showOnePostFromUser.execute({
      post_id: postId,
      user_id: userId,
    });

    return response.json(classToClass(post));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { postId } = request.params;
    const { content } = request.body;

    const updatePost = container.resolve(UpdatePostService);

    const updatedpost = await updatePost.execute({
      user_id,
      post_id: postId,
      content,
    });

    return response.json(classToClass(updatedpost));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { postId } = request.params;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute({
      post_id: postId,
      user_id,
    });

    return response.status(204).json();
  }
}
