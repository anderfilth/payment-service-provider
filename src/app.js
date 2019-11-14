import express from 'express';

import routes from './routes';
import handleError from './helpers/error/handleError';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use((err, req, res, next) => {
      handleError(err, res);
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
