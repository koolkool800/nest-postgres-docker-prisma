import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { TestingModule } from './modules/testing/testing.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    PrismaModule,
    ArticlesModule,
    TestingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
