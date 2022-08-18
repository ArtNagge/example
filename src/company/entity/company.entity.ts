import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Status } from '../types/enums/status.enum';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  inn: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @ManyToOne(() => UsersEntity, (user) => user.company, {
    onDelete: 'CASCADE',
    eager: true,
  })
  admin: UsersEntity;

  @Column({ type: 'boolean', default: null, nullable: true, select: false })
  success: null | boolean;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.AuthPartner,
  })
  status: Status;

  @Column({ type: 'varchar', length: 300, default: '' })
  email: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  legalAddress: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  actualAddress: string;

  @OneToMany(() => UsersEntity, (user) => user.company, {
    onDelete: 'CASCADE',
  })
  users: UsersEntity;
}
