import { Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendMail')
  async sendMail(@Query('email') email: string) {
    const mail = {
      from: 'knabao7a7@gmail.com',
      to: email,
      text: 'text official 2',
      html: '<h1>html official 2</h1>',
      subject: 'subject official 2',
    };

    return await this.mailService.sendEmail(mail);
  }
}
