export const dbConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'eventbos',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
