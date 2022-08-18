import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import Auth from 'src/auth/guards/auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { UsersCreateDto } from './types/dto/users-create.dto';
import { UsersUpdateDto } from './types/dto/users-update.dto';
import { UsersFilterDto } from './types/dto/users.dto';
import { UsersCreateRo } from './types/ro/users-create.ro';
import { UsersRo } from './types/ro/users.ro';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiInternalServerErrorResponse({ description: 'internal' })
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Создание пользователя',
  })
  @ApiBody({
    description: 'Объект создания пользвателя(Роль - партнер)',
    type: UsersCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Операция прошла успешно',
    type: UsersCreateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body(new ValidationPipe()) userDto: UsersCreateDto) {
    return this.usersService.create(userDto);
  }

  @Get('/info')
  @Auth()
  @ApiOperation({
    summary: 'Получени информации по пользователю(с реляциями)',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: UsersRo,
  })
  @HttpCode(HttpStatus.OK)
  async getAccount(@Req() req: Request) {
    const { userId } = req.user;

    return await this.usersService.findOneWithRelations(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({
    description: 'Операция прошла успешно',
    type: UsersRo,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async get(@Query() filter: UsersFilterDto) {
    console.log(filter);
    return await this.usersService.findAll(filter);
  }

  @Get(':id')
  @ApiParam({
    description: 'Id пользователя',
    name: 'id',
  })
  @ApiOperation({ summary: 'Получение информации о пользователе' })
  @ApiResponse({
    description: 'Операция прошла успешно',
    type: UsersRo,
  })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.usersService.findOneWithRelations(id);
  }

  @Delete(':id')
  @ApiParam({
    description: 'Id пользователя',
    name: 'id',
  })
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({
    description: 'Операция прошла успешно',
  })
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    return await this.usersService.deleteById(id);
  }

  @Patch(':id')
  @ApiParam({
    description: 'Id пользователя',
    name: 'id',
  })
  @ApiBody({
    required: false,
    description: 'Объект обновления пользователя',
    type: UsersUpdateDto,
  })
  @ApiOperation({
    summary: 'Изменение пользователя',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: UsersUpdateDto,
  })
  @HttpCode(HttpStatus.CREATED)
  public async change(
    @Param('id') id: string,
    @Body() company: UsersUpdateDto,
  ) {
    return await this.usersService.updateById(id, company);
  }
}
