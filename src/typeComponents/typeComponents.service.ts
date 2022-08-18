import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeComponentsRepository } from './typeComponents.repository';
import { TypeComponentsCreateDto } from './types/dto/typeComponents-create.dto';
import { TypeComponentsDto } from './types/dto/typeComponents.dto';
import {
  TypeComponentsDataFilterDto,
  TypeComponentsDataRo,
  TypeComponentsRo,
} from './types/ro/typeComponents.ro';

@Injectable()
export class TypeComponentsService {
  constructor(
    @InjectRepository(TypeComponentsRepository)
    private readonly typeComponentsRepository: TypeComponentsRepository,
  ) {}

  findAll = async ({
    offset,
    limit,
    _end,
    _start,
  }: TypeComponentsDataFilterDto): Promise<TypeComponentsDataRo> => {
    const skip = offset || _start;
    const take = limit || _end;

    const [data, count] = await Promise.all([
      this.typeComponentsRepository.find({
        ...(skip && { skip }),
        ...(take && { take }),
      }),
      this.typeComponentsRepository.count(),
    ]);

    return {
      data,
      count,
    };
  };

  findOne = async (
    type: Partial<TypeComponentsDto>,
  ): Promise<TypeComponentsRo> =>
    await this.typeComponentsRepository.findOne(type);

  create = async (type: TypeComponentsCreateDto) => {
    const { slug } = type;
    const findCompany = await this.findOne({ slug });

    if (findCompany) throw new ConflictException('Такой тип уже существует');

    const item = await this.typeComponentsRepository.create(type);

    return await this.typeComponentsRepository.save<TypeComponentsRo>(item);
  };
}
