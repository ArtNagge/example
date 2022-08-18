import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TypeComponentsEntity } from 'src/typeComponents/entity/typeComponents.entity';

export class ComponentDto implements Readonly<ComponentDto> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  sort: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({ type: 'number', default: 'TypeComponents - ID' })
  @IsNotEmpty()
  @IsNumber()
  type: TypeComponentsEntity;
}
