import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-payload';
import { TokenService } from './token.service';
import { LoginUserDto } from './types/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(userDto.email);

    if (!user) return null;

    if (!(await user.comparePassword(userDto.password))) return null;

    const accessToken = await this.tokenService.createAccessToken({
      sub: String(user.id),
      email: user.email,
    });

    await this.tokenService.deleteRefreshTokens(accessToken);

    const refreshToken = await this.tokenService.createRefreshToken({
      userId: String(user.id),
    });

    return { accessToken, refreshToken };
  }

  async validateUser({ sub, email }: JwtPayload): Promise<any> {
    const user = await this.usersService.findOneById(sub);

    if (!user) return null;

    return {
      userId: sub,
      email,
      role: user.role,
    };
  }
}
