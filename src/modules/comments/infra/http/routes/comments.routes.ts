import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CommentsController from '../controllers/CommentsController';
import CommentsLikeController from '../controllers/CommentsLikeController';

const commentsRouter = Router();
const commentsController = new CommentsController();
const commentsLikeController = new CommentsLikeController();

commentsRouter.get(
  '/:postId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  commentsController.index
);

commentsRouter.get(
  '/:postId/:commentId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
      commentId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  commentsController.show
);

commentsRouter.use(ensureAuthenticated);

commentsRouter.post(
  '/:postId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
    [Segments.BODY]: {
      content: Joi.string().min(1).max(280).required(),
    },
  }),
  commentsController.create
);

commentsRouter.put(
  '/:commentId',
  celebrate({
    [Segments.PARAMS]: {
      commentId: Joi.string().uuid({ version: 'uuidv4' }),
    },
    [Segments.BODY]: {
      content: Joi.string().min(1).max(280).required(),
    },
  }),
  commentsController.update
);

commentsRouter.patch(
  '/likes/:commentId',
  celebrate({
    [Segments.PARAMS]: {
      commentId: Joi.string().uuid({ version: 'uuidv4' }),
    },
  }),
  commentsLikeController.update
);

commentsRouter.delete(
  '/:commentId',
  celebrate({
    [Segments.PARAMS]: {
      commentId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  commentsController.delete
);

export default commentsRouter;
