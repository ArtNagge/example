import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentService } from 'src/component/component.service';
import { ComplectationRepository } from './complectation.repository';
import { ComplectationCreateDto } from './types/dto/complectation-create.dto';
import { ComplectationDto } from './types/dto/complectation.dto';
import {
  ComplectationDataFilterDto,
  ComplectationDataRo,
  ComplectationRo,
} from './types/ro/complectation.ro';

@Injectable()
export class ComplectationService {
  constructor(
    @InjectRepository(ComplectationRepository)
    private readonly complectationRepository: ComplectationRepository,
    private readonly componentService: ComponentService,
  ) {}

  findAll = async ({
    offset,
    limit,
    _end,
    _start,
  }: ComplectationDataFilterDto): Promise<ComplectationDataRo> => {
    const skip = offset || _start;
    const take = limit || _end;

    const [data, count] = await Promise.all([
      this.complectationRepository.find({
        ...(skip && { skip }),
        ...(take && { take }),
        relations: ['product'],
      }),
      this.complectationRepository.count(),
    ]);

    return {
      data,
      count,
    };
  };

  findOne = async (type: Partial<ComplectationDto>): Promise<ComplectationRo> =>
    await this.complectationRepository.findOne(type, {
      relations: ['product'],
    });

  create = async (complectation: ComplectationCreateDto) => {
    const { components: componentsList, ...other } = complectation;

    const components = await Promise.all(
      componentsList.map(
        async (id) =>
          await this.componentService.findOneWithRelations({ id: +id }),
      ),
    );

    const item = await this.complectationRepository.create({
      ...other,
      components,
    });

    return await this.complectationRepository.save(item);
  };
}
