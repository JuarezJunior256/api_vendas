import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Userscontroller from '../controllers/UsersController';

const userRouter = Router();

const usersController = new Userscontroller();

userRouter.get('/', usersController.index);
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default userRouter;
