import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
  ) {}

  @Post('sendMail')
  async sendMail() {
    return await this.mailerService.sendMail({
      from: 'knabao7a7@gmail.com',
      to: 'anhlovemeocon2002@gmail.com',
      text: 'Hello text',
      html: '<h1>Hello HTML</h1>',
      subject: 'Subject',
    });
  }
}
