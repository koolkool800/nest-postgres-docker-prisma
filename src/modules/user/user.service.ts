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
          email,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(
        `Error happened in get user by email because no user exist`,
      );
    }
  }

  async getUserById(id: number) {
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
    const s = await this.userRepository.find();

    return s;
  }
}
