import { Module } from '@nestjs/common';
import { Log4jsModule } from 'nestjs-log4js';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CoreModule } from './core/core.module';
import DbConfig from '../ormconfig';
import log4jsConfig from '../log4jsconfig';

const dbConfig = DbConfig as any;
dbConfig.entities = [User];
dbConfig.migrations = null;
dbConfig.host = process.env.DB_HOST;

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    Log4jsModule.forRoot(log4jsConfig),
    UsersModule,
    AuthModule,
    CoreModule,
  ],
})
export class AppModule {}
