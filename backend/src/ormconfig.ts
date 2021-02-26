import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { Category } from '@/categories/entities/category.entity';
import { Event } from '@/events/entities/event.entity';
import { User } from '@/users/entities/user.entity';
import { Reservation } from '@/reservations/entities/reservation.entity';

const PROD_ENV = 'production';

const config = {
  connection: process.env.DB_CONNECTION || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: +process.env.DB_PORT,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [Event, Category, User, Reservation],
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === PROD_ENV,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
