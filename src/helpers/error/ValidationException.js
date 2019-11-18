import logger from '../logger';

export default function ValidationException(statusCode, message, errors) {
  this.type = 'ValidationException';
  this.statusCode = statusCode || 400;
  this.validationErrors = {
    message: message || '',
    errors: errors || [],
  };
  logger.debug(
    `ValidationException: statusCode: ${statusCode} - message: ${message}`
  );
}

ValidationException.prototype = Error.prototype;
