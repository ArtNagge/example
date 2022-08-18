import { ApiHideProperty, PickType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { UsersDto } from './users.dto';

export class UsersCreateDto extends PickType(UsersDto, [
  'email',
  'fullName',
  'phone',
  'company',
]) {
  @ApiHideProperty()
  @IsEmpty()
  password: string;
}
