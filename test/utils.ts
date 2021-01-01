import { getConnection } from 'typeorm';

export const emptyDBTables = async () => {
  const connection = getConnection();
  // await connection.dropDatabase();
  // await connection.synchronize();
  const entities = connection.entityMetadatas;

  // await connection.query('SET FOREIGN_KEY_CHECKS=0;');

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE ${entity.tableName}`);
  }

  // await connection.query('TRUNCATE TABLE migrations');
  // await connection.query('SET FOREIGN_KEY_CHECKS=1');
  // await connection.runMigrations();
};
