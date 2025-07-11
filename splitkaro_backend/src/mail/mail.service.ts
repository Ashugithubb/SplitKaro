import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Maildto from './dto/mail.dto';
@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

   async sendMail(dto: Maildto): Promise<void> {
    console.log(dto.email);
  try {
    await this.mailerService.sendMail({
      to: dto.email,
    //   from: process.env.MAIL_USER,
      subject: 'Email Verification - OTP',
      template: './otp', 
      context: {
    
        name:"User",
        otp: dto.otp,
        year: new Date().getFullYear(),
      },
    });
    console.log('OTP email sent successfully to', dto.email);
  } catch (error) {
    console.error('Failed to send OTP email:', error);
  }
}

}