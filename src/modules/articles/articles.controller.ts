import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { ArticleEntity, CreateArticleDTO } from './dto/get-dto';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('')
  @ApiCreatedResponse({ type: ArticleEntity })
  async get() {
    return await this.articlesService.getAllArticles();
  }
  @Post()
  async create(@Body() input: CreateArticleDTO) {
    return this.articlesService.createNewArticle();
  }

  @Get(':id')
  async get1(@Param('id') id: string) {
    return await this.articlesService.get1(id);
  }

  @Get('aKienbeo')
  async hello() {
    return 'asdalushdakjh kajhds';
  }
}
