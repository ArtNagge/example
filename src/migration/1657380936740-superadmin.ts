import { MigrationInterface, QueryRunner } from 'typeorm';

import { hash } from 'bcryptjs';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Role } from 'src/auth/roles/role.enum';

export class superadmin1657380936740 implements MigrationInterface {
  name = 'superadmin1657380936740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UsersEntity, {
      fullName: 'Super Admin Adminovich',
      phone: '1337',
      email: 'superadmin',
      password: await hash('super', 12),
      role: Role.Admin,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UsersEntity, {
      email: 'superadmin',
    });
  }
}
