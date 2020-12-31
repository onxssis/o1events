import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    } as any),
    EventsModule,
    CategoriesModule,
    CommonModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
