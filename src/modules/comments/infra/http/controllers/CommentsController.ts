import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllCommentsFromPostService from '@modules/comments/services/ListAllCommentsFromPostService';
import ShowCommentService from '@modules/comments/services/ShowCommentService';
import CreateCommentService from '@modules/comments/services/CreateCommentService';
import UpdateCommentService from '@modules/comments/services/UpdateCommentService';
import DeleteCommentService from '@modules/comments/services/DeleteCommentService';

export default class CommentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;

    const listAllCommentsFromPost = container.resolve(
      ListAllCommentsFromPostService
    );

    const commentsFound = await listAllCommentsFromPost.execute(postId);

    return response.json(commentsFound);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { postId, commentId } = request.params;

    const showComment = container.resolve(ShowCommentService);

    const commentFound = await showComment.execute({
      post_id: postId,
      comment_id: commentId,
    });

    return response.json(commentFound);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { postId } = request.params;
    const { content } = request.body;

    const createComment = container.resolve(CreateCommentService);

    const comment = await createComment.execute({
      user_id,
      post_id: postId,
      content,
    });

    return response.json(comment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { commentId } = request.params;
    const { content } = request.body;

    const updateComment = container.resolve(UpdateCommentService);

    const comment = await updateComment.execute({
      user_id,
      comment_id: commentId,
      content,
    });

    return response.json(comment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { commentId } = request.params;

    const deleteComment = container.resolve(DeleteCommentService);

    await deleteComment.execute({
      user_id,
      comment_id: commentId,
    });

    return response.status(204).json();
  }
}
