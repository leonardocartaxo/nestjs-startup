import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto as UserDto, UserUpdateDto } from './dtos/users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  async findAll(): Promise<UserDto[]> {
    return (await this.usersService.findAll()) as UserDto[];
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find one user by id' })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return (await this.usersService.findById(id)) as UserDto;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update one user by id' })
  @ApiResponse({
    status: 200,
    type: UserUpdateDto,
  })
  async update(
    @Param('id') id: string,
    @Body() userDto: UserUpdateDto,
  ): Promise<UserDto> {
    return (await this.usersService.update(id, userDto)) as UserDto;
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one user by id' })
  @ApiResponse({
    status: 200,
    description: 'delete user by Id',
  })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
