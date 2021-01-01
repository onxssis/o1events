import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Event } from './events/entities/event.entity';
import { Category } from './categories/entities/category.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_CONNECTION: Joi.required(),
        DB_HOST: Joi.required(),
        DB_DATABASE: Joi.required(),
        DB_USERNAME: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_PORT: Joi.required(),
        JWT_PRIVATE_KEY: Joi.required(),
      }),
      cache: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Event, Category, User],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    EventsModule,
    CategoriesModule,
    CommonModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
