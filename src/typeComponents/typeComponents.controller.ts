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
import { TypeComponentsService } from './typeComponents.service';
import { TypeComponentsCreateDto } from './types/dto/typeComponents-create.dto';
import { TypeComponentsCreateRo } from './types/ro/typeComponents-create.ro';
import {
  TypeComponentsDataFilterDto,
  TypeComponentsDataRo,
  TypeComponentsRo,
} from './types/ro/typeComponents.ro';

@Controller('typeComponents')
@ApiTags('typeComponents')
@ApiInternalServerErrorResponse({ description: 'internal' })
export class TypeComponentsController {
  constructor(private readonly typeComponentsService: TypeComponentsService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка типов компонентов' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: TypeComponentsDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() filter: TypeComponentsDataFilterDto,
  ): Promise<TypeComponentsDataRo> {
    return await this.typeComponentsService.findAll(filter);
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Создание типа компонентов',
  })
  @ApiBody({
    description: 'Объект создания типа компонентов',
    type: TypeComponentsCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Операция прошла успешно',
    type: TypeComponentsCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) typeDto: TypeComponentsCreateDto,
  ): Promise<TypeComponentsRo> {
    return await this.typeComponentsService.create(typeDto);
  }
}
