import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';

//implement a part of article
export class CreateArticleDTO implements Partial<Article> {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ default: false })
  published?: boolean;

  @ApiProperty()
  createdAt?: Date;
}

export class ArticleEntity extends CreateArticleDTO {}
