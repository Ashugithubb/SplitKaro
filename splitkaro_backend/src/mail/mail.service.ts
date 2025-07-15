import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Maildto from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendExpenseAddedEmail(email: string, expenseDetails: { description: string; amount: number }) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'New Expense Added',
        template: './expense-added', 
        context: {
          description: expenseDetails.description,
          amount: expenseDetails.amount,
        },
      });
    } catch (error) {
      console.error('Failed to send expense added email:', error);
    }
  }

  async sendExpenseUpdatedEmail(email: string, expenseDetails: { description: string; amount: number }) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Expense Updated',
        template: './expense-updated',
        context: {
          description: expenseDetails.description,
          amount: expenseDetails.amount,
        },
      });
    } catch (error) {
      console.error('Failed to send expense update email:', error);
    }
  }

}
