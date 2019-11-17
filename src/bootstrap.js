const dotenv = require('dotenv');

const envFile = () => {
  if (process.env.NODE_ENV === 'test') {
    return '.env.test';
  }
  return '.env';
};

dotenv.config({
  path: envFile(),
});
