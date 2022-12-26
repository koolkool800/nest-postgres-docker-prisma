import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { TestingModule } from './modules/testing/testing.module';

@Module({
  imports: [PrismaModule, ArticlesModule, TestingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
