import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import Auth from 'src/auth/guards/auth.guard';
import { ProductDataFilterDto } from 'src/product/types/ro/product.ro';
import { RequestService } from './request.service';
import { RequestCreateDto } from './types/dto/request-create.dto';
import { RequestCreateRo } from './types/ro/product-create.ro';
import { RequestDataRo, RequestRo } from './types/ro/product.ro';

@ApiTags('request')
@Controller('request')
@ApiInternalServerErrorResponse({ description: 'internal' })
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка заявок' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: RequestDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() filter: ProductDataFilterDto): Promise<RequestDataRo> {
    return await this.requestService.findAll(filter);
  }

  @Get('/my')
  @Auth()
  @ApiOperation({ summary: 'Получение заявки по токену' })
  @ApiOkResponse({
    description: 'Операция выполнена успешно',
    type: RequestDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async findMy(@Req() req: Request): Promise<RequestDataRo> {
    const { userId } = req.user;

    return await this.requestService.findAll({ userId: +userId });
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Создание заявки',
  })
  @ApiBody({
    description: 'Объект создания заявки',
    type: RequestCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Операция прошла успешно',
    type: RequestCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) createRequestDto: RequestCreateDto,
    @Req() req: Request,
  ): Promise<RequestRo> {
    const { userId } = req.user;

    return await this.requestService.create(createRequestDto, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение заявки по id' })
  @ApiOkResponse({
    description: 'Операция выполнена успешно',
    type: RequestRo,
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<RequestRo> {
    return await this.requestService.findOne({ id: +id });
  }
}
