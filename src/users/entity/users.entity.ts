import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { RefreshToken } from 'src/auth/entity/refreshtoken.entity';
import { Role } from 'src/auth/roles/role.enum';
import { CompanyEntity } from 'src/company/entity/company.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RequestEntity } from 'src/request/entity/request.entity';

@Entity('users')
export class UsersEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('identity')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Partner,
  })
  role: Role;

  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @OneToMany(
    () => RefreshToken,
    (refreshToken: RefreshToken) => refreshToken.user,
    {
      cascade: true,
    },
  )
  refreshTokens: RefreshToken[];

  @OneToMany(() => RequestEntity, (request) => request.user, {
    cascade: true,
  })
  requests: RequestEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 12);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

  constructor(partial?: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }
}
