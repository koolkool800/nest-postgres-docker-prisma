import { BaseEntity, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { IBaseService } from './types';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  constructor(protected readonly repository: R) {}

  async findMany(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: any): Promise<T> {
    return await this.repository.findOne(id);
  }

  async create(data: any): Promise<T> {
    return await this.repository.save(data);
  }

  async delete(id: any): Promise<T> {
    const entity = await this.repository.findOne(id);
    return await this.repository.remove(entity);
  }

  async findByIds(ids: EntityId[]): Promise<T[]> {
    return [];
  }

  async update(id: EntityId, data: any): Promise<T> {
    return {} as T;
  }
}

//https://viblo.asia/p/nestjs-xay-dung-project-tich-hop-typeorm-repository-pattern-Eb85o9VBZ2G
