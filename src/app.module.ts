import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import DbConfig from '../ormconfig.js';

const dbConfig = DbConfig as any;
dbConfig.entities = [User];
dbConfig.migrations = null;
dbConfig.host = process.env.BTC_NESTJS_STARTUP_DB_HOST;

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
