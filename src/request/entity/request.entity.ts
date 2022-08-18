import { ComplectationEntity } from 'src/complectation/entity/complectation.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Statuses } from '../enums/status.enum';

@Entity('request')
export class RequestEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(
    () => ComplectationEntity,
    (complectation) => complectation.request,
    {
      cascade: true,
    },
  )
  complectations: ComplectationEntity[];

  @Column({
    type: 'enum',
    enum: Statuses,
    default: Statuses.Processing,
  })
  status: Statuses;

  @ManyToOne(() => UsersEntity, (user) => user.requests)
  user: UsersEntity;
}
