import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '@/users/entities/user.entity';

export class CreateAdminUser1613674495706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Admin User',
          email: 'admin@email.com',
          isAdmin: true,
          password: 'password123',
        },
      ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('email = :email', { email: 'admin@email.com' })
      .execute();
  }
}
