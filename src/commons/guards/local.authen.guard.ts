import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthenGuard extends AuthGuard('local') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const logger = new Logger(LocalAuthenGuard.name);
    const request = context.switchToHttp().getRequest();

    logger.debug('step 1 local authe guard');

    if (err || !user) {
      new UnauthorizedException();
    }
    logger.debug('step 2 return user local authen guard');
    logger.debug({ user });
    return user;
  }
}
