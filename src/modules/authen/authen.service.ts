import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TokenPayload } from './interfaces/authen.interface';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/authen.dto';
@Injectable()
export class AuthenService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private logger = new Logger(AuthenService.name);

  async register(registerInput: RegisterUserDto) {
    const hashed = await bcrypt.hash(registerInput.password, 10);
    try {
      const newUser = await this.userService.createUser({
        ...registerInput,
        password: hashed,
      });

      newUser.password = undefined;

      return newUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong, maybe this user is already exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getCookieWithJWTToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  async getAuthenticatedUser(email: string, hashedPass: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(user.password, hashedPass);
      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getAuthenticatedUser2(email: string, hashedPass: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(user.password, hashedPass);
      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(`Du ma ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPassword(userPassword: string, hashedPass: string) {
    const isMatchPass = await bcrypt.compare(userPassword, hashedPass);
    if (!isMatchPass) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async getAllUser() {
    return await this.userService.getAllUser();
  }
}
