import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
          password: bcrypt.hashSync('password', 10),
        },
      ])
      .execute();
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
