import { Request } from 'express';
import { User } from 'src/modules/user/entity/user.entity';

interface RequestWithUser extends Request {
  user: User;
}
