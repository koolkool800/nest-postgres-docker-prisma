import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly userService: UserService,
  ) {}

  // rooms?user=1,2 : 1,2 is idUser
  @Get('')
  async getRoom(@Query('users') users: string) {
    const userArray = users.split(',').map((userId) => parseInt(userId));
    return await this.roomsService.findRoomByUsers(userArray);
  }

  // rooms?users=1,2 : 1,2 is idUser
  @Post('')
  async createRoom(@Query('users') users: string) {
    try {
      const userArray = users.split(',').map((userId) => userId) as string[];
      const foundUsers = await Promise.all(
        userArray.map((userId) =>
          this.userService.getUserByOption({
            where: {
              id: userId,
            },
          }),
        ),
      );

      return await this.roomsService.createRoom(foundUsers);
    } catch (error) {
      throw new HttpException('Create failed', HttpStatus.BAD_REQUEST);
    }
  }
}
