import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ msg: 'hello dev' });
});

export default routes;
