import app from './app';
import logger from './helpers/logger';

const { PORT = 3333 } = process.env;

const server = app.listen(PORT, () => {
  let host = server.address().address;
  host = host === '::' ? 'localhost' : host;
  logger.info('listening at http://%s:%s', host, PORT);
});
