import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }
  private logger = new Logger();

  async sendEmail() {
    try {
      const transport = await SendGrid.send({
        from: 'knabao7a7@gmail.com',
        to: 'anhlovemeocon2002@gmail.com',
        text: 'Hello text',
        html: '<h1>Hello HTML</h1>',
        subject: 'Subject',
      });
      this.logger.debug(transport);

      return transport;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
