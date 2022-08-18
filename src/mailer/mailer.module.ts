import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomMailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_SMTP_HOST'),
          port: configService.get('MAILER_PORT'),
          secure: configService.get('MAILER_PORT') === '465',
          auth: {
            user: configService.get('MAILER_USERNAME'),
            pass: configService.get('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: `${configService.get('MAILER_FROM')}`,
        },
        template: {
          dir: join(__dirname, './mails/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [CustomMailerService],
  controllers: [MailerController],
  exports: [CustomMailerService], // 👈 export for DI
})
export class CustomMailerModule {}
