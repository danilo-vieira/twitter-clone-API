import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateLikesService from '@modules/posts/services/UpdateLikesService';

export default class PostLikesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { postId } = request.params;

    const updateLikes = container.resolve(UpdateLikesService);

    const updatedPost = await updateLikes.execute({
      post_id: postId,
      user_id,
    });

    return response.json(classToClass(updatedPost));
  }
}
