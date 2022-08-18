import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustomMessageDTO {
  @ApiProperty({ description: 'Кому отправить электронное письмо' })
  @IsString()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ description: 'Кому отправить электронное письмо' })
  @IsString()
  @IsOptional()
  login: string;

  @ApiProperty({ description: 'Кому отправить электронное письмо' })
  @IsString()
  @IsOptional()
  password: string;
}
