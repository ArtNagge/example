import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ComponentEntity } from 'src/component/entity/component.entity';
import { ProductRo } from 'src/product/types/ro/product.ro';

export class ComplectationRo implements Readonly<ComplectationRo> {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: ProductRo })
  product: ProductRo;

  @ApiProperty({
    type: 'jsonb',
    default:
      '[{"id": 1,"name": "Процессор AMD Ryzen 7 5700G (8/16, 3,8/4.6GHz, 19MB,65W,AM4)","price": 1550,"sort": 0,"type": "processor"}]',
  })
  components: ComponentEntity[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  comment: string;
}

export class ComplectationDataRo implements Readonly<ComplectationDataRo> {
  @ApiProperty({ type: ComplectationRo, isArray: true })
  data: ComplectationRo[];

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class ComplectationDataFilterDto
  implements Readonly<ComplectationDataFilterDto>
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
