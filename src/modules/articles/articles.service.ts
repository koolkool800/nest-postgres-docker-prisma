import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getAllArticles() {
    return this.prisma.article.findMany({
      where: { published: false },
    });
  }

  async createNewArticle() {
    return this.prisma.article.create({
      data: {
        title: 'Title1',
        body: 'Body1',
        description: 'Descrip1',
      },
    });
  }

  async get1(id: string) {
    return this.prisma.article.findFirst({
      where: {
        id: +id,
      },
    });
  }
}
