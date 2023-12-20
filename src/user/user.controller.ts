import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { profileImageOptions } from 'src/common/multer/multer-options';
import { UserService } from './user.service';
import { AuthService } from 'src/common/auth/auth.service';
import { LocalAuthGuard } from 'src/common/auth/local-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('auth/register')
  @UseInterceptors(FileInterceptor('file', profileImageOptions))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() newUser: CreateUserDto,
  ) {
    return this.userService.createUser(file, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // TODO: edit user
  /* @Put('auth/edit')
  async edit(
      @Body() postData: UpdateUserDto,
      @CurrentUser() user: User,
  ): Promise<User> {
      return this.userService.updateUser(user.id, postData);
  } */

  @Get('me')
  getProfile(@CurrentUser() user: Partial<User>) {
    return this.userService.getUserByUsername(user.username);
  }
}
