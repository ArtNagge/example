import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import Auth from 'src/auth/guards/auth.guard';
import { CompanyService } from './company.service';
import { CompanyUpdateDto } from './types/dto/company-update.dto';
import { CompanyUpdateRo } from './types/ro/company-update.ro';
import UserRo, {
  CompanyDataRo,
  CompanyFilterDto,
  CompanyRo,
} from './types/ro/company.ro';

@Controller('company')
@ApiTags('company')
@ApiInternalServerErrorResponse({ description: 'internal' })
@ApiUnauthorizedResponse({
  description: 'auth_required',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка компаний' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyDataRo,
  })
  @HttpCode(HttpStatus.OK)
  async getList(@Query() filter: CompanyFilterDto) {
    const items = await this.companyService.findAll(filter);

    return filter.withCount ? { data: items[0], count: items[1] } : items;
  }

  @Get('/my')
  @Auth()
  @ApiOperation({
    summary: 'Получение компании привязанной к партнеру',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyRo,
  })
  @HttpCode(HttpStatus.OK)
  async getAllAndCount(@Req() req: Request) {
    const { userId } = req.user;
    return await this.companyService.findOneByUser(userId);
  }

  @Get('/my/manager')
  @Auth()
  @ApiOperation({
    summary: 'Получение менеджера компании, привязанной к партнеру',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyRo,
  })
  @HttpCode(HttpStatus.OK)
  async getCompanyManagerByPartner(@Req() req: Request) {
    const { userId } = req.user;
    return await this.companyService.findManagerByCompanyPartnerId(userId);
  }

  @Patch('/my')
  @Auth()
  @ApiBody({
    required: false,
    description: 'Объект обновления компании',
    type: CompanyUpdateDto,
  })
  @ApiOperation({
    summary: 'Изменение своей компании',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyUpdateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  public async updateUserCompany(
    @Body() company: CompanyUpdateDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user;

    return await this.companyService.updateCompanyByUserId(userId, company);
  }

  @Get(':id')
  @ApiParam({
    description: 'Id компании',
    name: 'id',
  })
  @ApiOperation({ summary: 'Получение информации о компании' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyRo,
  })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.companyService.findOneWithRelations(id);
  }

  @Get(':id/manager')
  @ApiParam({
    description: 'Id компании',
    name: 'id',
  })
  @ApiOperation({ summary: 'Получение информации о менеджере компании' })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: UserRo,
  })
  @HttpCode(HttpStatus.OK)
  async getManagerByCompanyId(@Param('id') id: string) {
    return await this.companyService.findManagerByCompanyId(id);
  }

  @Patch(':id')
  @ApiParam({
    description: 'Id компании',
    name: 'id',
  })
  @ApiBody({
    required: false,
    description: 'Объект обновления компании',
    type: CompanyUpdateDto,
  })
  @ApiOperation({
    summary: 'Изменение компании',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyUpdateRo,
  })
  @HttpCode(HttpStatus.CREATED)
  public async change(
    @Param('id') id: string,
    @Body() company: CompanyUpdateDto,
  ) {
    return await this.companyService.change(id, company);
  }

  @Delete(':id')
  @Auth()
  @ApiParam({
    description: 'Id компании',
    name: 'id',
  })
  @ApiBody({
    required: false,
    description: 'Объект обновления компании',
    type: CompanyUpdateDto,
  })
  @ApiOperation({
    summary: 'Изменение компании',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: CompanyUpdateRo,
  })
  @HttpCode(HttpStatus.OK)
  public async deleteCompanyById(@Req() req: Request, @Param('id') id: string) {
    const { userId } = req.user;

    return await this.companyService.deleteCompanyById(id, userId);
  }
}
