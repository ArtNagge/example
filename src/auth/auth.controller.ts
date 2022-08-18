import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import Auth from './guards/auth.guard';
import { TokenService } from './token.service';
import { LoginUserDto } from './types/dto/login-user.dto';
import { RefreshTokensDto } from './types/dto/refresh-tokens.dto';
import { LoginRo } from './types/ro/login.ro';

@ApiTags('auth')
@ApiInternalServerErrorResponse({ description: 'internal' })
@ApiUnauthorizedResponse({
  description: 'auth_required',
})
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Авторизация(Токен живет 30 дней)',
  })
  @ApiBody({
    description: 'Объект пользователя для авторизации',
    type: LoginUserDto,
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: LoginRo,
  })
  @ApiUnauthorizedResponse({
    description: 'wrong_login_data',
  })
  public async login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
    const loginResults = await this.authService.login(userDto);
    if (!loginResults) throw new UnauthorizedException('wrong_login_data');
    return loginResults;
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Рефреш токена',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
    type: LoginRo,
  })
  public async refreshTokens(
    @Body(new ValidationPipe()) refreshTokens: RefreshTokensDto,
  ): Promise<LoginRo> {
    return this.tokenService.getAccessTokenFromRefreshToken(
      refreshTokens.refresh_token,
    );
  }

  @Post('check-tokens')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Проверка живучести токена',
  })
  @ApiOkResponse({
    description: 'Операция прошла успешно',
  })
  public checkingTokens(): boolean {
    return true;
  }

  // @Get('/check-post')
  // @ApiOperation({
  //   summary: 'Change Shot by id',
  // })
  // @ApiOkResponse({
  //   description: 'Successful operation',
  //   type: ShotsRo,
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiInternalServerErrorResponse({ description: 'internal' })
  // async checkPost(@Body() body: any): Promise<any> {
  //   console.log(body);

  //   // await page();

  //   return true;
  // }
}
