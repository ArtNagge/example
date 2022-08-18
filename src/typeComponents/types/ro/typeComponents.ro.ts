import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class TypeComponentsRo implements Readonly<TypeComponentsRo> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;
}

export class TypeComponentsDataRo implements Readonly<TypeComponentsDataRo> {
  @ApiProperty({ type: TypeComponentsRo, isArray: true })
  data: TypeComponentsRo[];

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class TypeComponentsDataFilterDto
  implements Readonly<TypeComponentsDataFilterDto>
{
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
