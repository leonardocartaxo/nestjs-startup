module.exports = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  host: process.env.BTC_NESTJS_STARTUP_DB_HOST || `localhost`,
  database: process.env.BTC_NESTJS_STARTUP_DB_NAME || `nestjs-startup`,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/**/*.entity.ts',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
