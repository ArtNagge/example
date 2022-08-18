import { UsersUpdateDto } from './types/dto/users-update.dto';
import { nanoid } from 'nanoid';

import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { UsersCreateDto } from './types/dto/users-create.dto';
import { UsersRepository } from './users.repository';
import { UsersFilterDto } from './types/dto/users.dto';
import { CustomMailerService } from 'src/mailer/mailer.service';
import { Role } from 'src/auth/roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    private readonly mailerService: CustomMailerService,
  ) {}

  create = async ({ company, ...user }: UsersCreateDto) => {
    const findUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (findUser) throw new ConflictException('email_registered');

    const newCompany = company && (await this.companyService.create(company));

    const users = await this.usersRepository.findAllManagerAndAdmin();

    const newUser = await this.usersRepository.create({
      ...user,
      password: '',
      ...(company && { company: newCompany }),
    });
    await this.usersRepository.save(newUser);

    for (const manager of users) {
      console.log(manager);
      this.mailerService.sendMail({
        receiver: manager.email,
        subject: `Новая регистрация: ${newCompany.name}`,
        html: `
        <h3><b>id: ${newCompany.id}</b></h3>
        <h3><b>Про организацию</b></h3>
        <ul>
          <li>Название: ${newCompany.name}</li>
          <li>ИНН: ${newCompany.inn}</li>
        </ul>
        <h3><b>Про пользователя</b></h3>
        <ul>
          <li>ФИО: ${user.fullName}</li>
          <li>Email: ${user.email}</li>
          <li>Телефон: ${user.phone}</li>
        </ul>`,
      });
    }

    return null;
  };

  createUser = async (companyId) => {
    console.log(companyId);

    const user = await this.usersRepository.findOne({
      where: { company: companyId, role: Role.Partner },
    });

    const password = nanoid();

    console.log(user, password, 'UPDATE USER MANAGE');

    await this.usersRepository.update(
      user.id,
      Object.assign(user, {
        password,
      }),
    );

    await this.companyService.change(companyId, {
      admin: user.id,
    });

    console.log('123123123');

    this.mailerService.sendRegistrationEmail({
      receiver: user.email,
      login: user.email,
      password: password,
    });
  };

  updateById = async (id: string, newUser: UsersUpdateDto) => {
    const item = await this.findOneById(id);

    if (!item) {
      throw new NotFoundException('User not found');
    }

    const { password, ...otherItem } = item;

    await this.usersRepository.update(id, Object.assign(otherItem, newUser));

    return await this.findOneWithRelations(id);
  };

  findOneWithRelations = async (userId: string) =>
    await this.usersRepository.findInfo(userId);

  findOneById = async (id: string) =>
    await this.usersRepository.findOne({ id });

  findOneByEmail = async (email: string) =>
    await this.usersRepository.findOne({ email });

  findAll = async (filter: UsersFilterDto) =>
    await this.usersRepository.findAll(filter);

  deleteById = async (id: string) => await this.usersRepository.deleteById(id);
}
