import { Category } from '@/categories/entities/category.entity';
import slugify from 'slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  slugify() {
    this.slug = slugify(this.title, { lower: true });
  }
}
