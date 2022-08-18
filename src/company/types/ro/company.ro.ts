import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Status } from '../enums/status.enum';

export class CompanyRo implements Readonly<CompanyRo> {
  success: null | boolean;
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  inn: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  legalAddress: string;

  @ApiProperty()
  @IsString()
  actualAddress: string;

  @ApiProperty({ type: UsersEntity, isArray: true })
  users: UsersEntity[];

  @ApiProperty({ type: UsersEntity })
  admin: UsersEntity;

  @ApiProperty({
    description: 'Status',
    enum: Status,
    default: Status.AuthPartner,
  })
  @IsEnum(Status)
  status: Status;
}

export class CompanyDataRo implements Readonly<CompanyDataRo> {
  @ApiProperty({ type: OmitType(CompanyRo, ['users']), isArray: true })
  data: Omit<CompanyRo, 'users'>[];

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class CompanyFilterDto implements Readonly<CompanyFilterDto> {
  @ApiProperty({
    description: 'Возвращает общее число записей',
    required: false,
    example: [true, 'enabled', 'true', 1, '1'],
  })
  @IsOptional()
  @Transform(
    ({ value }) => [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1,
  )
  @IsBoolean()
  withCount?: boolean;

  @ApiProperty({
    description: 'Фильтр на смещение(offset)',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiProperty({
    description: 'Фильтр на лимит(limit)',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiHideProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  _end?: number;

  @ApiHideProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _start?: number;
}

export class CompanyWithoutUser implements Readonly<CompanyRo> {
  users: UsersEntity[];
  admin: UsersEntity;
  success: null | boolean;

  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  inn: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  legalAddress: string;

  @ApiProperty()
  @IsString()
  actualAddress: string;

  @ApiProperty({
    description: 'Status',
    enum: Status,
    default: Status.AuthPartner,
  })
  @IsEnum(Status)
  status: Status;
}

export default class UserRo {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNumber()
  role: number;

  @ApiProperty({ type: CompanyWithoutUser })
  company: CompanyWithoutUser;
}
