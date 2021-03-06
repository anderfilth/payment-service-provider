import express from 'express';
import 'express-async-errors';
import Youch from 'youch';

import routes from './routes';
import logger from './helpers/logger';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        logger.debug(`Internal Server Error - ${JSON.stringify(errors)}`);
        return res.status(500).json(errors);
      }
      return res.status(500).json({
        error: 'Internal Server Error, the administrador was notified!',
      });
    });
  }
}

export default new App().server;
