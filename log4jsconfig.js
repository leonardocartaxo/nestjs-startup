module.exports = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
    app: {
      type: 'dateFile',
      filename: 'logs/app.log',
      pattern: '-yyyy-MM-dd',
    },
    errorFile: {
      type: 'dateFile',
      filename: 'logs/errors.log',
      pattern: '-yyyy-MM-dd',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['app', 'errors'],
      level: 'DEBUG',
    },
    http: {
      appenders: ['access'],
      level: 'DEBUG',
    },
  },
};
