import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const PROD_ENV = 'production';

const config = {
  host: 'localhost',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
};

// FOR GOOGLE CLOUD SQL
if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === PROD_ENV) {
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}
// type: 'postgres',
//       host: process.env.DB_HOST,
//       port: +process.env.DB_PORT,
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//       entities: [Event, Category, User, Reservation],
//       migrations: ['dist/migrations/*.js'],
//       cli: {
//         migrationsDir: 'src/migrations',
//       },
//       migrationsRun: process.env.NODE_ENV === 'production',
//       synchronize: process.env.NODE_ENV !== 'production',

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: config.database || 'vivubook-dev',
  entities: [],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
