module.exports = {
  secret: process.env.TOKEN_SECRET || '5ebe2294ecd0e0f08eab7690d2a6ee69',
  expiresIn: process.env.TOKEN_EXPIRES_IN || '1d',
};
