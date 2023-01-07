import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from 'commons/types';
import { JwtAuthenGuard } from 'src/commons/guards/jwt.authen.guard';
import { LocalAuthenGuard } from 'src/commons/guards/local.authen.guard';
import { AuthenService } from './authen.service';
import { LoginDto, RegisterUserDto } from './dto/authen.dto';

@Controller('authen')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}
  logger = new Logger(AuthenController.name);

  //avoid :  goi Res() res : Response la se error

  @HttpCode(200)
  @UseGuards(LocalAuthenGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    const user = req.user;
    const cookie = this.authenService.getCookieWithJWTToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    // response send ok
    return cookie;
  }

  @Post('register')
  async register(@Body() input: RegisterUserDto) {
    return await this.authenService.register(input);
  }

  @UseGuards(JwtAuthenGuard)
  @Get('')
  async getAllUser(@Req() req: RequestWithUser) {
    return await this.authenService.getAllUser();
  }

  @Get('delete')
  async deleteAll() {
    return await this.authenService.deleteAllUser();
  }
}
