import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

export class UsersRo implements Readonly<UsersRo> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
    nullable: true,
    required: false,
    default: Role.Partner,
  })
  @IsEnum(Role)
  role: Role;
}
