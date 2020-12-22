import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  lng?: number;

  @Column({ nullable: true })
  lat?: number;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: false })
  premium: boolean;
}
