import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty()
  readonly id?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}

// export type UsersDto = Omit<User, "hashedPassword">;

export class UserCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UserUpdateDto {
  @ApiProperty()
  name: string;
}

export class UserUpdateEmail {
  @ApiProperty()
  email: string;
}

export class UserUpdatePassword {
  @ApiProperty()
  password: string;
}
