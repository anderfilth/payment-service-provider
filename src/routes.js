import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import userController from './app/components/user/userController';
import authController from './app/components/auth/authController';
import swaggerDocument from './docs/swagger.json';

const routes = new Router();

routes.use('/docs', swaggerUi.serve);
routes.get('/docs', swaggerUi.setup(swaggerDocument));

routes.route('/login').post(authController.store);

routes.route('/api/v1/users').post(userController.store);

export default routes;
