import { PickType } from '@nestjs/swagger';
import { TypeComponentsDto } from './typeComponents.dto';

export class TypeComponentsUpdateDto extends PickType(TypeComponentsDto, [
  'name',
  'slug',
]) {}
