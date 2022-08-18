import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomMailerService } from './mailer.service';
import { SendMessageDto } from './types/dto/send-message.dto';

@ApiTags('mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: CustomMailerService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SendMessageDto })
  @ApiOperation({
    summary: 'Send a new mail',
  })
  @ApiOkResponse({
    description: 'Successful operation',
  })
  @ApiInternalServerErrorResponse({ description: 'internal' })
  async sendMail(@Body() message: SendMessageDto) {
    return this.mailerService.sendMail(message);
  }
}
