import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ComponentEntity } from 'src/component/entity/component.entity';
import { ProductEntity } from 'src/product/entity/product.entity';

export class ComplectationDto implements Readonly<ComplectationDto> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ type: 'number', default: 'ProductEntity - ID' })
  @IsNotEmpty()
  @IsNumber()
  product: ProductEntity;

  @ApiProperty({ type: 'number', isArray: true })
  components: ComponentEntity[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment: string;
}
