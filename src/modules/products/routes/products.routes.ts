import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productRouter = Router();
const productController = new ProductsController();

productRouter.get('/', productController.index);
productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productController.show,
);
productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  productController.create,
);
productRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required(),
    },
  }),
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productController.update,
);
productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productController.delete,
);

export default productRouter;
