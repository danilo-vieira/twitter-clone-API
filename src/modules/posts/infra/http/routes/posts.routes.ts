import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import PostsController from '../controllers/PostsController';
import UsersPostsController from '../controllers/UsersPostsController';

const postsRouter = Router();
const postsController = new PostsController();
const usersPostsController = new UsersPostsController();

postsRouter.get('/', postsController.index);

postsRouter.get('/:userId', usersPostsController.index);
postsRouter.get('/:userId/:postId', usersPostsController.show);

postsRouter.use(ensureAuthenticated);

postsRouter.post('/', postsController.create);
postsRouter.put('/:postId', usersPostsController.update);
postsRouter.delete('/:postId', usersPostsController.delete);

export default postsRouter;
