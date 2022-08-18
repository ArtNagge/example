import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { TypeComponentsRo } from 'src/typeComponents/types/ro/typeComponents.ro';

export class ComponentRo implements Readonly<ComponentRo> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  sort?: number;

  @ApiProperty({ type: TypeComponentsRo })
  type: TypeComponentsRo;
}

export class ComponentDataRo implements Readonly<ComponentDataRo> {
  @ApiProperty({ type: ComponentRo, isArray: true })
  data: ComponentRo[];

  @ApiProperty()
  count: number;
}

export class ComponentDataFilterDto
  implements Readonly<ComponentDataFilterDto>
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
