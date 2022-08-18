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
import { ComplectationService } from './complectation.service';
import { ComplectationCreateDto } from './types/dto/complectation-create.dto';
import { ComplectationCreateRo } from './types/ro/complectation-create.ro';
import {
  ComplectationDataFilterDto,
  ComplectationDataRo,
  ComplectationRo,
} from './types/ro/complectation.ro';

@Controller('complectation')
@ApiTags('complectation')
@ApiInternalServerErrorResponse({ description: 'internal' })
export class ComplectationController {
  constructor(private readonly complectationService: ComplectationService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка комплектаций' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: ComplectationDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() filter: ComplectationDataFilterDto,
  ): Promise<ComplectationDataRo> {
    return await this.complectationService.findAll(filter);
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Создание компонента',
  })
  @ApiBody({
    description: 'Объект создания компонента',
    type: ComplectationCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Операция прошла успешно',
    type: ComplectationCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) typeDto: ComplectationCreateDto,
  ): Promise<ComplectationRo> {
    return await this.complectationService.create(typeDto);
  }
}
