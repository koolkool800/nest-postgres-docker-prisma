import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('')
  async getRoom(@Query('users') users: string[]) {
    return await this.roomsService.findRoomByUsers(users);
  }
}
