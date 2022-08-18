import { EntityRepository, Repository } from 'typeorm';
import { CompanyEntity } from './entity/company.entity';
import { CompanyFilterDto } from './types/ro/company.ro';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  private readonly alias = 'company';

  async deleteCompanyById(id: string) {
    return this.delete({ id });
  }

  async findAllAndCount({ offset, limit, _end, _start }: CompanyFilterDto) {
    const builder = this.createQueryBuilder(this.alias)
      .skip(offset || _start)
      .take(limit || _end);

    return await builder.addSelect(`${this.alias}.success`).getManyAndCount();
  }

  async findAll({ offset, limit, _end, _start }: CompanyFilterDto) {
    const builder = this.createQueryBuilder(this.alias)
      .skip(offset || _start)
      .take(limit || _end);

    return await builder.addSelect(`${this.alias}.success`).getMany();
  }

  findOneByOwner = async (userId: string) => {
    const builder = this.createQueryBuilder(this.alias)
      .innerJoinAndSelect(`${this.alias}.users`, 'users')
      .where(`${this.alias}.admin = :userId`, { userId })
      .select();

    const result = await builder.getOne();

    return result;
  };

  findOneByUser = async (userId: string) => {
    console.log(userId);
    return await this.findOne({
      where: {
        admin: userId,
      },
    });

    // const builder = this.createQueryBuilder(this.alias).select();
    // // .innerJoinAndSelect(`${this.alias}.users`, 'users')
    // // .where('users.id = :userId', { userId })
    // // .select([
    // //   `${this.alias}.id`,
    // //   `${this.alias}.name`,
    // //   `${this.alias}.inn`,
    // //   `${this.alias}.email`,
    // //   `${this.alias}.legalAddress`,
    // //   `${this.alias}.phone`,
    // //   `${this.alias}.actualAddress`,
    // //   `${this.alias}.status`,
    // //   `${this.alias}.adminId`,
    // //   'users.id',
    // //   'users.fullName',
    // //   'users.email',
    // //   'users.phone',
    // //   'users.role',
    // // ]);
    // const result = await builder.getOne();
    // console.log(result);
    // return result;
  };

  async findInfo(id: string) {
    const builder = this.createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.users`, 'users')
      .where({ id })
      .select([
        `${this.alias}.id`,
        `${this.alias}.name`,
        `${this.alias}.inn`,
        `${this.alias}.email`,
        `${this.alias}.legalAddress`,
        `${this.alias}.actualAddress`,
        `${this.alias}.status`,
        `${this.alias}.phone`,
        `${this.alias}.admin`,
        `${this.alias}.success`,
        'users.id',
        'users.fullName',
        'users.email',
        'users.phone',
        'users.role',
      ]);

    return await builder.getOne();
  }

  findManagerByCompanyId = async (companyId) => {
    const builder = this.createQueryBuilder(this.alias)
      .innerJoinAndSelect(`${this.alias}.users`, 'users')
      .where('users.companyId = :companyId', { companyId: companyId })
      .select([
        `${this.alias}.id`,
        `${this.alias}.name`,
        `${this.alias}.inn`,
        `${this.alias}.email`,
        `${this.alias}.legalAddress`,
        `${this.alias}.actualAddress`,
        `${this.alias}.status`,
        'users.id',
        'users.fullName',
        'users.email',
        'users.phone',
        'users.role',
      ]);

    const result = await builder.getOne();

    return result;
  };
}
