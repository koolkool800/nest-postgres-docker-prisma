import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from 'commons/types';
import { Request, Response } from 'express';
import { LocalAuthenGuard } from 'src/commons/guards/local.authen.guard';
import { AuthenService } from './authen.service';
import { LoginDto, RegisterUserDto } from './dto/authen.dto';

@Controller('authen')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}
  logger = new Logger(AuthenController.name);

  @HttpCode(200)
  @UseGuards(LocalAuthenGuard)
  @Post('')
  async login(@Req() req: Request) {
    this.logger.debug('Login final step...');
    this.logger.debug({ req });
    // const user = request.user;
    // this.logger.debug(user);
    // // user.password = undefined;
    // this.logger.debug('Login final step 2 ...');

    return 'abc';
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
    return await this.authenService.getAuthenticatedUser(
      input.email,
      input.password,
    );
  }

  @Get('delete')
  async deleteAll() {
    return await this.authenService.deleteAllUser();
  }
}
