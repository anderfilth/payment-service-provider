import { Router } from 'express';

const routes = new Router();

import authController from './app/components/auth/authController';

routes.get('/', (req, res) => res.json({ message: 'ok' }));

router.route('/login')
  .post(authController.login)

router.route('/signup')
  .post(authController.signup)

export default routes;
