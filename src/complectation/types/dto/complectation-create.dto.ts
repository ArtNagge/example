import { PickType } from '@nestjs/swagger';
import { ComplectationDto } from './complectation.dto';

export class ComplectationCreateDto extends PickType(ComplectationDto, [
  'comment',
  'components',
  'count',
  'product',
]) {}
