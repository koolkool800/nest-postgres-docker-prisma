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
import { JwtRefreshAuthenGuard } from 'src/commons/guards/jwt-refresh.authen.guard';
import { JwtAuthenGuard } from 'src/commons/guards/jwt.authen.guard';
import { LocalAuthenGuard } from 'src/commons/guards/local.authen.guard';
import { UserService } from '../user/user.service';
import { AuthenService } from './authen.service';
import { LoginDto, RegisterUserDto } from './dto/authen.dto';

@Controller('authen')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenController {
  constructor(
    private readonly authenService: AuthenService,
    private userService: UserService,
  ) {}
  logger = new Logger(AuthenController.name);

  //avoid :  goi Res() res : Response la se error

  @HttpCode(200)
  @UseGuards(LocalAuthenGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    const user = req.user;
    const { accessToken, refreshToken } = this.authenService.getAllToken(
      user.id,
    );

    await this.userService.setRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
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

  @UseGuards(JwtRefreshAuthenGuard)
  @Get('userWithJWTRefreshToken')
  async getCurrentUser(@Req() request) {
    return request?.user;
  }
}
