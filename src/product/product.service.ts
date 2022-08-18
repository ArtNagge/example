import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './entity/product.entity';
import { ProductCreateDto } from './types/dto/product-create.dto';
import { ProductDto } from './types/dto/product.dto';
import { ProductDataFilterDto, ProductDataRo } from './types/ro/product.ro';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly complectationRepository: ProductRepository,
  ) {}

  findAll = async ({
    offset,
    limit,
    _end,
    _start,
  }: ProductDataFilterDto): Promise<ProductDataRo> => {
    const skip = offset || _start;
    const take = limit || _end;

    const [data, count] = await Promise.all([
      this.complectationRepository.find({
        ...(skip && { skip }),
        ...(take && { take }),
      }),
      this.complectationRepository.count(),
    ]);

    return {
      data,
      count,
    };
  };

  findOne = async (
    type: ProductDto | ProductCreateDto,
  ): Promise<ProductEntity> => await this.complectationRepository.findOne(type);

  create = async (type: ProductCreateDto) => {
    const findProduct = await this.findOne(type);

    if (findProduct)
      throw new ConflictException('Такой продукт уже существует');

    const item = await this.complectationRepository.create(type);

    return await this.complectationRepository.save<ProductEntity>(item);
  };
}
