import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/response.util';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto, LoginUserDto, UserQueryDto } from 'src/users/dto/user-query.dto';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly responseService: ResponseService,
  ) { }

  @ApiOperation({
    summary: 'Login User',
    description: 'User need to login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserQueryDto,
    description: 'User success login',
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    type: ApiResponse,
    description: "User email/password is incorrect"
  })
  @Post('/login')
  public async login(@Body() userLoginDto: LoginUserDto, @Res() res: Response, @Req() req: Request) {
    try {
      const data = await this.authService.loginUser(userLoginDto);
      const response = this.responseService.ReturnHttpSuccess(req, data);
      if (data === null) {
        return res.status(HttpStatus.UNAUTHORIZED).json(this.responseService.ReturnHttpError(req, HttpStatus.UNAUTHORIZED));
      }
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      if (err) return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
  }

  @Post('/register')
  public async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
