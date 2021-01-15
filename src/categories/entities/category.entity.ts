import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slugify from 'slugify';
import { CoreEntity } from '@/common/entities/core.entity';

@Entity()
export class Category extends CoreEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  cover: string;

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    this.slug = slugify(this.name, { lower: true });
  }
}
