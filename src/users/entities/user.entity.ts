import { Exclude } from 'class-transformer';
import { Roles } from '../../auth/Roles';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdOn?: Date;

  @UpdateDateColumn()
  updatedOn?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  hashedPassword: string;

  @Column('varchar', { array: true, default: '{USER}' })
  roles: Roles[];
}
