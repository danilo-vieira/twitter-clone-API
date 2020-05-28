import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().min(6),
      password_confirmation: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
        otherwise: Joi.forbidden(),
      }),
    },
  }),
  profileController.update
);
profileRouter.delete('/delete', profileController.delete);

export default profileRouter;
