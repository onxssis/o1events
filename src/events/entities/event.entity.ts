import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import slugify from 'slugify';

import { Category } from '@/categories/entities/category.entity';
import { CoreEntity } from '@/common/entities/core.entity';

@Entity()
export class Event extends CoreEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true, type: 'real' })
  lng?: string;

  @Column({ nullable: true, type: 'real' })
  lat?: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: false })
  premium: boolean;

  @ManyToMany(() => Category, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  categories: Category[];

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    this.slug = slugify(this.title, { lower: true });
  }
}
