import { PickType } from '@nestjs/swagger';
import { RequestDto } from './request.dto';

export class RequestUpdateDto extends PickType(RequestDto, [
  'complectations',
  'status',
]) {}
