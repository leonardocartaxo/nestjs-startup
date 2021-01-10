import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto, UserDto } from '../users/dtos/users.dto';
import { AuthenticationResponse, Login } from './dtos/authDtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create account' })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createUserDto: UserCreateDto,
  ): Promise<AuthenticationResponse> {
    try {
      return await this.authService.signup(createUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() userLogin: Login): Promise<AuthenticationResponse> {
    return await this.authService.login(userLogin);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
