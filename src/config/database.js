require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  pool: {
    min: process.env.DB_MIN_POOL
      ? parseInt(process.env.DB_MIN_POOL, 10)
      : undefined,
    max: process.env.DB_MAX_POOL
      ? parseInt(process.env.DB_MAX_POOL, 10)
      : undefined,
    idle: process.env.DB_IDLE ? parseInt(process.env.DB_IDLE, 10) : undefined,
  },
  logging: false,
  // JUST SQLITE
  storage: './__tests__/database.sqlite',
};
