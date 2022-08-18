import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    description: 'Информация о пользователе для почтовой программы',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ description: 'Тема для рассылки' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Тема для рассылки' })
  @IsString()
  @IsOptional()
  html: string;

  @ApiProperty({ description: 'Кому отправить электронное письмо' })
  @IsString()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ description: 'Кому отправить электронное письмо' })
  @IsString()
  @IsOptional()
  login?: string;

  @ApiProperty({ description: 'Кому отправить электронное письмо' })
  @IsString()
  @IsOptional()
  password?: string;
}
