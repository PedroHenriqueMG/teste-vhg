import { Request } from 'express';
import { User } from 'src/modules/user/entities/User';
export class AuthenticatedRequestModel extends Request {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
}

export class ProtectedRequestModel extends Request {
  user: User;
}
