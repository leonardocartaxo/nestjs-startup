import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserCreateDto, UserDto } from '../users/dtos/users.dto';
import { AuthenticationResponse, IJwtPayload, Login } from './dtos/authDtos';
import { User } from '../users/entities/user.entity';
import { Roles } from './Roles';

process.env.SALT =
  process.env.SALT ||
  '1d8b84e4a115eea3f32ea772070238ab832bcd72b2fb59566c6e13e21c5d99db';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userCreateDto: UserCreateDto): Promise<AuthenticationResponse> {
    const user: User = {
      hashedPassword: AuthService.encryptPassword(userCreateDto.password),
      email: userCreateDto.email,
      name: userCreateDto.name,
      roles: [Roles.USER],
    };

    const userDto = await this.usersService.create(user);
    const cleanedUserDto = new UserDto(userDto as User);

    return this.generateAuthenticationResponse(cleanedUserDto);
  }
  async login(userLogin: Login): Promise<AuthenticationResponse> {
    const user = await this.usersService.findOneByEmail(userLogin.email);
    if (!user) throw new ForbiddenException();

    const isValidPassword = AuthService.verifyPassword(
      userLogin.password,
      user.hashedPassword,
    );

    if (!isValidPassword) throw new ForbiddenException();

    const userDto = new UserDto(user);

    return this.generateAuthenticationResponse(userDto);
  }

  private static encryptPassword(password: string): string {
    return crypto
      .createHmac('sha1', process.env.SALT)
      .update(password)
      .digest('hex');
    // more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
  }

  private static verifyPassword(
    password: string,
    hashedPassword: string,
  ): boolean {
    return hashedPassword == AuthService.encryptPassword(password);
  }

  private generateAuthenticationResponse(
    userDto: UserDto,
  ): AuthenticationResponse {
    const jwtPayload: IJwtPayload = {
      id: userDto.id,
      email: userDto.email,
      name: userDto.name,
      roles: userDto.roles,
    };

    return {
      accessToken: this.jwtService.sign(jwtPayload),
      user: userDto as UserDto,
    };
  }
}
