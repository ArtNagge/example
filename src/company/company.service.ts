import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CompanyRepository } from './company.repository';
import { UsersRepository } from './../users/users.repository';

import { CompanyCreateDto } from './types/dto/company-create.dto';
import { CompanyUpdateDto } from './types/dto/company-update.dto';
import { CompanyFilterDto } from './types/ro/company.ro';

import validateInn from 'src/common/utils/validateInn';
import { Role } from 'src/auth/roles/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  findAll = async (filter: CompanyFilterDto) =>
    filter.withCount
      ? await this.companyRepository.findAllAndCount(filter)
      : await this.companyRepository.findAll(filter);

  findOne = async (company: CompanyCreateDto) =>
    await this.companyRepository.findOne(company);

  findOneById = async (id: string) =>
    await this.companyRepository.findOne({ id });

  findOneByOwner = async (id: string) =>
    await this.companyRepository.findOneByOwner(id);

  findOneByUser = async (userId) =>
    await this.companyRepository.findOneByUser(userId);

  findManagerByCompanyId = async (partnerId: string) =>
    await this.usersRepository.findManagerByCompanyId(partnerId);

  findOneWithRelations = async (companyId: string) =>
    await this.companyRepository.findInfo(companyId);

  findManagerByCompanyPartnerId = async (companyId: string) =>
    await this.usersRepository.findManagerByCompanyPartnerId(companyId);

  deleteCompanyById = async (id: string, userId: string) => {
    const user = await this.usersRepository.findUserFullInfo(userId);
    const companyId = id === 'my' ? user.company.id : id;

    if (id !== 'my' && user.role !== Role.Admin)
      throw new ForbiddenException('not_owner');

    await this.companyRepository.delete(companyId);
  };

  create = async (company: CompanyCreateDto) => {
    const findCompany = await this.findOne(company);

    if (findCompany) throw new ConflictException('company_registered');

    if (!validateInn(company.inn)) throw new ConflictException('invalid_inn');

    const item = await this.companyRepository.create(company);

    return await this.companyRepository.save(item);
  };

  async change(id: string, { manager, ...newCompanyInfo }: CompanyUpdateDto) {
    try {
      const item = await this.findOneById(id);

      console.log(
        manager,
        newCompanyInfo,
        newCompanyInfo.success,
        item.id,
        item.success,
        !item.success && newCompanyInfo.success,
      );

      if (!item.success && newCompanyInfo.success) {
        console.log('1231234', id);
        // TODO: сделать отправку письма об отказе в регистрации
        this.usersService.createUser(item.id);
      }

      await this.companyRepository.update(
        id,
        Object.assign(item, newCompanyInfo),
      );

      if (manager) {
        const newCompany = await this.findOneById(id);

        await this.usersRepository.update(manager, {
          company: newCompany,
        });
      }

      return await this.findOneWithRelations(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }

  async updateCompanyByUserId(id: string, company: CompanyUpdateDto) {
    try {
      const item = await this.findOneByOwner(id);

      if (!item) throw new ForbiddenException('not_owner');
      console.log(item, company);

      await this.companyRepository.save({ ...item, ...company } as any);

      return await this.findOneWithRelations(item.id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
