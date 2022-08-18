import { PickType } from '@nestjs/swagger';
import { ComponentDto } from './component.dto';

export class ComponentCreateDto extends PickType(ComponentDto, [
  'name',
  'price',
  'sort',
  'type',
]) {}
