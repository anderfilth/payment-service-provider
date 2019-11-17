import logger from '../logger';

export default (err, res) => {
  const { statusCode, message } = err;
  logger.error(
    `API returned one or more errors while executing: statusCode: ${statusCode} - message: ${message}`
  );
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
