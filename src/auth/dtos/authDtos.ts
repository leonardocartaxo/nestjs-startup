import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dtos/users.dto';
import { Roles } from '../Roles';

export class Login {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class AuthenticationResponse {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  user: UserDto;
}

export interface IJwtPayload {
  id: number;
  email: string;
  name: string;
  roles: Roles[];
  iat?: number;
  exp?: number;
}

export interface ICurrentUser {
  id: number;
  email: string;
  name: string;
  roles: Roles[];
}
