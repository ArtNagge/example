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
import { ComponentService } from './component.service';
import { ComponentCreateDto } from './types/dto/component-create.dto';
import { ComponentCreateRo } from './types/ro/component-create.ro';
import {
  ComponentDataFilterDto,
  ComponentDataRo,
  ComponentRo,
} from './types/ro/component.ro';

@Controller('component')
@ApiTags('component')
@ApiInternalServerErrorResponse({ description: 'internal' })
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка компонентов' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: ComponentDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() filter: ComponentDataFilterDto,
  ): Promise<ComponentDataRo> {
    return await this.componentService.findAll(filter);
  }

  @Post()
  @Auth()
  @ApiOperation({
    summary: 'Создание компонента',
  })
  @ApiBody({
    description: 'Объект создания компонента',
    type: ComponentCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Операция прошла успешно',
    type: ComponentCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) typeDto: ComponentCreateDto,
  ): Promise<ComponentRo> {
    return await this.componentService.create(typeDto);
  }
}
