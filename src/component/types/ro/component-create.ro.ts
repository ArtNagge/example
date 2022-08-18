import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ComponentRo } from './component.ro';

export class ComponentCreateRo extends OmitType(ComponentRo, ['type']) {
  @ApiProperty()
  type: number;
}
