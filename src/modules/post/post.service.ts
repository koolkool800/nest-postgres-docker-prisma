import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationParams } from 'commons/base.entity';
import { Repository } from 'typeorm';
import { Post, PostEntity } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<PostEntity>,
  ) {}
  private logger = new Logger(PostService.name);

  async createPost() {
    try {
      const newPost = await this.postRepository.create({
        content: 'Content1',
        title: 'Title1',
      });

      await this.postRepository.save(newPost);

      return newPost;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getPosts(options: PaginationParams) {
    try {
      const result = await this.postRepository.findAndCount({
        skip: options.offset,
        take: options.limit,
      });

      const [data, total] = result;
      return {
        data,
        total,
      };
    } catch (error) {}
  }
}
