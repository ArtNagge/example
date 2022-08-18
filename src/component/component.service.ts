import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeComponentsEntity } from 'src/typeComponents/entity/typeComponents.entity';
import { TypeComponentsRo } from 'src/typeComponents/types/ro/typeComponents.ro';
import { ComponentRepository } from './component.repository';
import { ComponentEntity } from './entity/component.entity';
import { ComponentCreateDto } from './types/dto/component-create.dto';
import { ComponentFindDto } from './types/dto/component-find.dto';
import {
  ComponentDataFilterDto,
  ComponentDataRo,
  ComponentRo,
} from './types/ro/component.ro';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(ComponentRepository)
    private readonly componentRepository: ComponentRepository,
  ) {}

  findAll = async ({
    offset,
    limit,
    _end,
    _start,
  }: ComponentDataFilterDto): Promise<ComponentDataRo> => {
    const skip = offset || _start;
    const take = limit || _end;

    const [components, count] = await this.componentRepository.findAndCount({
      ...(skip && { skip }),
      ...(take && { take }),
      relations: ['type'],
    });

    const data = components.map((component) => ({
      ...component,
      type: component.type.slug as unknown as TypeComponentsRo,
    }));

    return {
      data,
      count,
    };
  };

  findOneWithRelations = async (
    type: Partial<ComponentFindDto>,
  ): Promise<ComponentEntity> => {
    const item = await this.componentRepository.findOne(type, {
      relations: ['type'],
    });

    return { ...item, type: item.type.slug as unknown as TypeComponentsEntity };
  };

  findOne = async (type: Partial<ComponentFindDto>): Promise<ComponentEntity> =>
    await this.componentRepository.findOne(type);

  create = async (component: ComponentCreateDto) => {
    const { name } = component;
    const findComponent = await this.findOne({ name });

    if (findComponent)
      throw new ConflictException('Такая комплектующая уже существует');

    const item = await this.componentRepository.create(component);

    return await this.componentRepository.save<ComponentRo>(item);
  };
}
