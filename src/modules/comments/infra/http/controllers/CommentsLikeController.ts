import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateLikesService from '@modules/comments/services/UpdateLikesService';

export default class CommentLikesController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { commentId } = request.params;

    const updateLikes = container.resolve(UpdateLikesService);

    const updatedComment = await updateLikes.execute({
      comment_id: commentId,
      user_id,
    });

    return response.json(updatedComment);
  }
}
