import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
import { SendMessageDto } from './types/dto/send-message.dto';
import { CustomMessageDTO } from './types/dto/custom-message.dto';

@Injectable()
export class CustomMailerService {
  private readonly _transporter: nodemailer.Transporter;

  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail({
    html = '',
    subject = 'subject',
    receiver = '',
  }: SendMessageDto) {
    const payload = {
      to: receiver,
      subject,
      html,
    };

    await this.mailerService.sendMail(payload);
  }

  sendRegistrationEmail = async ({
    receiver = '',
    login = '',
    password = '',
  }: CustomMessageDTO) => {
    const payload = {
      to: `${receiver}`,
      subject: 'Ваша регистрация на портале NoName подтверждена',
      template: './indexEmail',
      context: {
        login,
        password,
      },
    };

    await this.mailerService.sendMail(payload);
  };

  sendRejectionEmail = async ({ receiver }: CustomMessageDTO) => {
    const payload = {
      to: `${receiver}`,
      subject: 'Вам отказано в регистрации на портале NoName',
      template: './rejectionEmail',
    };

    await this.mailerService.sendMail(payload);
  };
}
