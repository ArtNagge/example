import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';
import { CompanyCreateDto } from 'src/company/types/dto/company-create.dto';

export class UsersDto implements Readonly<UsersDto> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ type: CompanyCreateDto })
  @IsOptional()
  company: CompanyCreateDto;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // managerId: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    nullable: true,
    required: false,
    default: Role.Partner,
  })
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

export class UsersFilterDto implements Readonly<UsersFilterDto> {
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
  @IsEnum(Role)
  role?: Role;

  @ApiHideProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _start?: number;
}
