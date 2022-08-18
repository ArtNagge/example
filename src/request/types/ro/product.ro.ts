import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ComplectationRo } from 'src/complectation/types/ro/complectation.ro';
import { Statuses } from 'src/request/enums/status.enum';

export class RequestRo implements Readonly<RequestRo> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty({ type: ComplectationRo, isArray: true })
  complectations: ComplectationRo[];

  @ApiProperty({
    description: 'Статус',
    enum: Statuses,
    nullable: false,
    required: false,
    default: Statuses.Processing,
  })
  @IsEnum(Statuses)
  status: Statuses;
}

export class RequestDataRo implements Readonly<RequestDataRo> {
  @ApiProperty({ type: RequestRo, isArray: true })
  data: RequestRo[];

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class RequestDataFilterDto implements Readonly<RequestDataFilterDto> {
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

  @ApiHideProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;
}
