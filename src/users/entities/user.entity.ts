import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CoreEntity } from '@/common/entities/core.entity';

@Entity()
export class User extends CoreEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_admin: boolean;

  // private tempPassword: string;

  // @AfterLoad()
  // private loadTempPassword(): void {
  //   this.tempPassword = this.password;
  // }

  @BeforeInsert()
  @BeforeUpdate()
  private hashPassword(): void {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
      // this.loadTempPassword();
    }
  }
}
