import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CommentsController from '../controllers/CommentsController';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.get('/:postId', commentsController.index);
commentsRouter.get('/:postId/:commentId', commentsController.show);

commentsRouter.use(ensureAuthenticated);

commentsRouter.post('/:postId', commentsController.create);
commentsRouter.put('/:commentId', commentsController.update);
commentsRouter.delete('/:commentId', commentsController.delete);

export default commentsRouter;
