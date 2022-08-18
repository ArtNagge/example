import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplectationService } from 'src/complectation/complectation.service';
import { RequestRepository } from './request.repository';
import { RequestCreateDto } from './types/dto/request-create.dto';
import { RequestDto } from './types/dto/request.dto';
import {
  RequestDataFilterDto,
  RequestDataRo,
  RequestRo,
} from './types/ro/product.ro';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestRepository)
    private readonly requestRepository: RequestRepository,
    private readonly complectationService: ComplectationService,
  ) {}

  findAll = async ({
    offset,
    limit,
    _end,
    _start,
    userId,
  }: RequestDataFilterDto): Promise<RequestDataRo> => {
    const skip = offset || _start;
    const take = limit || _end;

    const [data, count] = await this.requestRepository.findAndCount({
      ...(skip && { skip }),
      ...(take && { take }),
      ...(userId && { where: { user: { id: userId } } }),
      join: {
        alias: 'request',
        innerJoinAndSelect: {
          complectations: 'request.complectations',
          product: 'complectations.product',
        },
      },
    });

    return {
      data,
      count,
    };
  };

  findOne = async (type: Partial<RequestDto>): Promise<RequestRo> =>
    await this.requestRepository.findOne(type, {
      join: {
        alias: 'request',
        innerJoinAndSelect: {
          complectations: 'request.complectations',
          product: 'complectations.product',
        },
      },
    });

  create = async (request: RequestCreateDto, userId: string) => {
    const { complectations: complectationsCreate, ...other } = request;

    const complectations = await Promise.all(
      complectationsCreate.map((id) =>
        this.complectationService.findOne({ id: +id }),
      ),
    );

    const requestItem = await this.requestRepository.create({
      ...other,
      complectations,
      user: { id: userId },
    });

    return await this.requestRepository.save<RequestRo>(requestItem);
  };
}
