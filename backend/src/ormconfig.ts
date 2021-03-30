import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

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
  entities: [join(__dirname, '**/entities/*{.ts,.js}')],
  synchronize: process.env.NODE_ENV !== PROD_ENV,
  migrationsRun: process.env.NODE_ENV === PROD_ENV,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
