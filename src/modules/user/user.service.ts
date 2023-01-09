import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../authen/dto/authen.dto';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createWithGoogle(email: string, name: string) {
    // register w stripe

    const newUser = await this.userRepository.create({
      email,
      name,
      isRegisteredWithGoogle: true,
      // stripeCustomerId
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(
        `Error happened in get user by email because no user exist`,
      );
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(
        `Error happened in get user by id because no user exist`,
      );
    }
  }

  async createUser(registerDto: RegisterUserDto) {
    try {
      const newUser = await this.userRepository.create({
        ...registerDto,
      });

      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw new HttpException(
        `Error in user service : ${error}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getAllUser() {
    return await this.userRepository.find();
  }

  async deleteAll() {
    return await this.userRepository.delete({});
  }

  async setRefreshToken(userId: string, refreshToken: string) {
    try {
      const user = await this.getUserById(userId);

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      user.refreshToken = hashedRefreshToken;

      await this.userRepository.update(userId, {
        refreshToken: hashedRefreshToken,
      });
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  async getUserFromRefreshToken(refreshToken: string, userId: string) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new BadRequestException(`User not found`);
    }
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      throw new BadRequestException(`Refresh token is not match`);
    }
    return user;
  }
}
