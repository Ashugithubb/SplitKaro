import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const mailerConfigAsync = {
  useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
    transport: {
      service: 'gmail',
      port: 1025,
      ignoreTLS: true,
      secure: false,
      auth: {
        user: configService.get<string>('MAIL_USER'),
        pass: configService.get<string>('MAIL_PASS'),
      },
    },
    defaults: {
      from: `"Zenmonk" <${configService.get<string>('MAIL_USER')}>`,
    },
    preview: true,
    template: {
      dir: join(process.cwd(), 'src/mail/template'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
