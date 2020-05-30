import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';
import UserPostsController from '../controllers/UserPostsController';
import PostLikesController from '../controllers/PostLikesController';

const postsRouter = Router();
const postsController = new PostsController();
const userPostsController = new UserPostsController();
const postLikesController = new PostLikesController();

postsRouter.get('/', postsController.index);

postsRouter.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  userPostsController.index
);
postsRouter.get(
  '/:postId/:userId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
      userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  userPostsController.show
);

postsRouter.use(ensureAuthenticated);

postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().min(1).max(280).required(),
    },
  }),
  postsController.create
);

postsRouter.put(
  '/:postId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
    [Segments.BODY]: {
      content: Joi.string().min(1).max(280).required(),
    },
  }),
  userPostsController.update
);

postsRouter.patch(
  '/likes/:postId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }),
    },
  }),
  postLikesController.update
);

postsRouter.delete(
  '/:postId',
  celebrate({
    [Segments.PARAMS]: {
      postId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    },
  }),
  userPostsController.delete
);

export default postsRouter;
