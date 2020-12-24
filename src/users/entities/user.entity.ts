import { Column, Entity } from 'typeorm';

import { CoreEntity } from '@/common/entities/core.entity';

type UserRole = 'admin' | 'client';

@Entity()
export class User extends CoreEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: UserRole;
}
