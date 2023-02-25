import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { Room } from './entity/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  logger = new Logger(RoomsService.name);

  async findRoomByUsers(users: number[]) {
    try {
      const room = await this.roomRepository.findOne({
        where: {
          members: {
            id: In(users),
          },
        },
        relations: ['members'],
      });

      if (!room)
        return {
          message: 'not found',
        };

      return room;
    } catch (error) {
      throw new HttpException(
        `Error in request ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async createRoom(users: User[]) {
    try {
      const newRoom = this.roomRepository.create({
        members: users,
      });

      await this.roomRepository.save(newRoom);

      return newRoom;
    } catch (error) {}
  }
}
