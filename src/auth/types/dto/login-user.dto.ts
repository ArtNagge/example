import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'superadmin' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ default: 'super' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
