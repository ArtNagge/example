import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';
import { UsersFilterDto } from './types/dto/users.dto';
import { Role } from 'src/auth/roles/role.enum';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  private readonly alias = 'users';

  async findInfo(id: string) {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.company`, 'company')
      .where({ id })
      .select([
        'users.id',
        'users.fullName',
        'users.email',
        'users.phone',
        'users.role',
      ]);

    return await builder.getOne();
  }

  async findAll({ offset, limit, _end, _start, role }: UsersFilterDto) {
    console.log(role);
    let builder = this.createQueryBuilder(this.alias)
      .select([
        'users.id',
        'users.fullName',
        'users.email',
        'users.phone',
        'users.role',
      ])
      .skip(offset || _start)
      .take(limit || _end);

    if (role) {
      builder = builder.where({ role });
    }

    return await builder.getMany();
  }

  findUserFullInfo = async (userId: string) => {
    const builder = this.createQueryBuilder(this.alias)
      .innerJoinAndSelect(`${this.alias}.company`, 'company')
      .where('users.id = :userId', { userId })
      .select();

    const result = await builder.getOne();
    return result;
  };

  findManagerByCompanyId = async (companyId: string) => {
    const builder = this.createQueryBuilder(this.alias)
      .innerJoinAndSelect(`${this.alias}.company`, 'company')
      .where('users.companyId = :companyId', { companyId: companyId })
      .andWhere('users.role = :role', { role: Role.Manager })
      .select([
        `${this.alias}.id`,
        `${this.alias}.fullName`,
        `${this.alias}.email`,
        `${this.alias}.phone`,
        `${this.alias}.role`,
      ]);

    const result = await builder.getOne();
    return result;
  };

  findManagerByCompanyPartnerId = async (partnerId: string) => {
    const manager = this.createQueryBuilder(this.alias)
      .select([
        `${this.alias}.id`,
        `${this.alias}.fullName`,
        `${this.alias}.email`,
        `${this.alias}.phone`,
        `${this.alias}.role`,
      ])
      .where(
        `users.companyId = (
          (SELECT "companyId" FROM "users" as usr
          WHERE usr.id = '${partnerId}')
        )`,
      )
      .andWhere('users.role = :role', { role: Role.Manager })
      .getOne();

    return manager;
  };

  findAllManagerAndAdmin = async () => {
    const users = this.find({
      where: [
        {
          role: Role.Manager,
        },
        {
          role: Role.Admin,
        },
      ],
    });
    return users;
  };

  deleteById = async (partnerId: string) => {
    const manager = this.delete(partnerId);
    return manager;
  };
}
