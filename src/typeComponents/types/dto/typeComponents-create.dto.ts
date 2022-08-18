import { PickType } from '@nestjs/swagger';
import { TypeComponentsDto } from './typeComponents.dto';

export class TypeComponentsCreateDto extends PickType(TypeComponentsDto, [
  'name',
  'slug',
]) {}
