import { Request } from 'express';
import { User } from 'src/modules/auth/entities/User';

/**
 * USE JUST ON SIGN ROUTE
 */
export class AuthRequestModel extends Request {
  user: User;
}
