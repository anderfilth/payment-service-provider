import winston from 'winston';

const configLog = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta',
  },
  transports: [
    new winston.transports.File({
      filename: './psp-api.log',
      maxFiles: 5,
      maxsize: 10000000, // 10MB
      tailable: true, // rotation log
      level: 'error',
    }),
  ],
};

configLog.transports.push(
  new winston.transports.Console({
    colorize: true,
    level: 'debug',
  })
);

export default new winston.Logger({
  transports: configLog.transports,
  levels: configLog.levels,
  colors: configLog.colors,
});
