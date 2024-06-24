import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '@app/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
