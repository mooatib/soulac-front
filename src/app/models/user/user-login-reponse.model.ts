import { User } from './user.model';

export class UserLoginResponse {
  user: User;
  access_token: string;
  roles: string[];
}
