import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ComplectationRo } from 'src/complectation/types/ro/complectation.ro';
import { Statuses } from 'src/request/enums/status.enum';

export class RequestDto implements Readonly<RequestDto> {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: 'number', isArray: true })
  complectations: ComplectationRo[];

  @ApiProperty({
    description: 'Статус',
    enum: Statuses,
    nullable: false,
    required: false,
    default: Statuses.Processing,
  })
  @IsOptional()
  @IsEnum(Statuses)
  status: Statuses;
}
