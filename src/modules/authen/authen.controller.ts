import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'commons/types';
import { Request } from 'express';
import { LocalAuthenGuard } from 'src/commons/guards/local.authen.guard';
import { AuthenService } from './authen.service';
import { LoginDto, RegisterUserDto } from './dto/authen.dto';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenGuard)
  @Post('login')
  async login(@Res() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() input: RegisterUserDto) {
    return await this.authenService.register(input);
  }

  @Get('')
  async getAllUser() {
    return await this.authenService.getAllUser();
  }

  @Post('fake-login')
  async authen(@Body() input: LoginDto) {
    return await this.authenService.getAuthenticatedUser2(
      input.email,
      input.password,
    );
  }
}
