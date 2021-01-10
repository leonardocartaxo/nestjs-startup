import { Injectable } from '@nestjs/common';
import { UserDto, UserUpdateDto } from './dtos/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<UserDto> {
    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email: email });
  }

  async findById(id: number): Promise<UserDto> {
    return await this.usersRepository.findOne(id);
  }

  async findAll(): Promise<UserDto[]> {
    return await this.usersRepository.find();
  }

  async update(id: string, userDto: UserUpdateDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);

    user.name = userDto.name;

    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    await this.usersRepository.softDelete(id);
  }
}
