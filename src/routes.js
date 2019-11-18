import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import userController from './app/components/user/userController';
import authController from './app/components/auth/authController';
import transactionController from './app/components/transaction/transactionController';

import authMiddleware from './app/middlewares/auth';

import swaggerDocument from './docs/swagger.json';

const routes = new Router();

routes.use('/docs', swaggerUi.serve);
routes.get('/docs', swaggerUi.setup(swaggerDocument));

routes.post('/api/v1/login', authController.store);
routes.post('/api/v1/users', userController.store);

// Todas as rotas que forem chamadas a partir daqui tem que ser autenticada
routes.use(authMiddleware);
routes.patch('/api/v1/users', userController.update);
routes.post('/api/v1/transactions', transactionController.store);
routes.get('/api/v1/transactions', transactionController.index);

export default routes;
