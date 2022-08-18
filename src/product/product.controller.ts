import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import Auth from 'src/auth/guards/auth.guard';
import { ProductService } from './product.service';
import { ProductCreateDto } from './types/dto/product-create.dto';
import { ProductCreateRo } from './types/ro/product-create.ro';
import {
  ProductDataFilterDto,
  ProductDataRo,
  ProductRo,
} from './types/ro/product.ro';

@Controller('product')
@ApiTags('product')
@ApiInternalServerErrorResponse({ description: 'internal' })
export class ProductController {
  constructor(private readonly complectationService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка продуктов' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: ProductDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async getList(@Query() filter: ProductDataFilterDto): Promise<ProductDataRo> {
    return await this.complectationService.findAll(filter);
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Создание продукта',
  })
  @ApiBody({
    description: 'Объект создания продукта',
    type: ProductCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Операция прошла успешно',
    type: ProductCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) typeDto: ProductCreateDto,
  ): Promise<ProductRo> {
    return await this.complectationService.create(typeDto);
  }
}
