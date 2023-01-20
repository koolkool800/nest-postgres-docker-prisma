import { IsNumber, IsOptional, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ default: `now()`, nullable: true })
  createdAt: Date;

  @Column()
  createdBy: string;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updateAt: Date;
}

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit: number;
}
