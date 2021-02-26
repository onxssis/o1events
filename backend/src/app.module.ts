import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';

dotenv.config();

import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';

import * as connectionOptions from './ormconfig';

const ENVIRONMENT = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENVIRONMENT ? `.env.${ENVIRONMENT}` : '.env',
      validationSchema: Joi.object({
        DB_CONNECTION: Joi.required(),
        DB_HOST: Joi.required(),
        DB_DATABASE: Joi.required(),
        DB_USERNAME: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_PORT: Joi.required(),
        JWT_PRIVATE_KEY: Joi.required(),
        JWT_ACCESS_TOKEN_EXPIRATION: Joi.required(),
      }),
      cache: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRoot(connectionOptions),
    EventsModule,
    CategoriesModule,
    CommonModule,
    UsersModule,
    AuthModule,
    ReservationsModule,
  ],
})
export class AppModule {}
