import { PickType } from '@nestjs/swagger';
import { RequestDto } from './request.dto';

export class RequestCreateDto extends PickType(RequestDto, [
  'complectations',
]) {}
