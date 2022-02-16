import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import Userscontroller from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const userRouter = Router();

const usersController = new Userscontroller();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

userRouter.get('/', isAuthenticated, usersController.index);
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
userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRouter;
