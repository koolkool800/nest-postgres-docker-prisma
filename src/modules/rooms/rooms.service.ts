import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Room } from './entity/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  logger = new Logger(RoomsService.name);

  async findRoomByUsers(users: string[]) {
    const newUsers = users.map((user) => +user);
    try {
      const room = await this.roomRepository.findOne({
        where: {
          members: {
            id: In(newUsers),
          },
        },
      });

      this.logger.debug(room);

      if (!room)
        return {
          message: 'not found',
        };

      return room;
    } catch (error) {
      this.logger.error(`${error}`);
      throw new HttpException(
        `Error in request ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
