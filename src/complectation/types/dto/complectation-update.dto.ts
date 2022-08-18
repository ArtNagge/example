import { PickType } from '@nestjs/swagger';
import { ComplectationDto } from './complectation.dto';

export class ComplectationUpdateDto extends PickType(ComplectationDto, [
  'comment',
  'components',
  'count',
  'product',
]) {}
