import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import {
  ApiUseTags,
  ApiResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Credentials } from '@shared/credentials.dto';
import { CurrentUser } from './decorators/user.decorator';
import { UserRO } from './response/user.response';
import { LoginRO } from './response/login.response';
import { auth } from 'firebase';
@ApiUseTags('Users')
@Controller('api/rest/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: `You've successfully logged in.` })
  async login(
    @Body() credentials: Credentials,
  ): Promise<LoginRO | auth.UserCredential> {
    return await this.userService.login(credentials);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async register(@Body() credentials: Credentials) {
    return await this.userService.register(credentials);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Successfully collected all user documents.',
  })
  async getAll() {
    return await this.userService.getCollection();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(@Body() data: UserDto) {
    const user = await this.userService.create(data);
    const save = await user.save();
    const newUser = await save.get();
    return newUser.data();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async me(@CurrentUser() data: UserRO) {
    console.log('data', data);
    return new User(data).getData();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param('id') id: string) {
    const awaitUser = await this.userService.getOne(id);
    const user = await awaitUser.get();
    return new User(user.data()).getData();
  }

  @Put('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateMe(@CurrentUser() user: any, @Body() body: UserDto) {
    console.log('user', user);
    // const id = await this.userService.getOne()
    // return await this.userService.update(id, body)
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() data: Partial<UserDto>) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async destroy(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
