import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/response.util';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user-query.dto';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/login')
  public async login(@Body() userLoginDto: LoginUserDto, @Req() req: Request){
    const data = await this.authService.loginUser(userLoginDto);
    const response = this.responseService.ReturnHttpSuccess(req, data);

    return response;
  }

  @Post('/register')
  public async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
