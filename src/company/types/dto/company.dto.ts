import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../enums/status.enum';

export class CompanyDto implements Readonly<CompanyDto> {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  inn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  success: null | boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  legalAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  actualAddress: string;

  @ApiHideProperty()
  @IsOptional()
  users: string[];

  @ApiHideProperty()
  @IsOptional()
  admin: string;

  @ApiHideProperty()
  @IsOptional()
  manager: string;

  @ApiProperty({
    description: 'Status',
    enum: Status,
    default: Status.AuthPartner,
  })
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
