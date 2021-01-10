module.exports = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'nestjs-startup',
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
