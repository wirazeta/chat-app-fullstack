import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/response.util';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
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
    description: 'User success login',
    content:{
      'application/json':{
        example:{
          "message": {
            "title": "OK",
            "body": "SUCCESS"
          },
          "metadata": {
            "path": "/api/auth/login",
            "statusCode": HttpStatus.OK,
            "status": "OK",
            "message": "/api/auth/login [200] OK",
            "timestamp": "timestamp",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          },
          "data": {
            "access_token": "jwt_token"
          }
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    content:{
      'application/json': {
        example:{
          "message": {
            "title": "Error",
            "body": "Error"
          },
          "metadata": {
            "path": "/api/auth/login",
            "statusCode": HttpStatus.UNAUTHORIZED,
            "status": "Error",
            "message": "/api/auth/login [401] Error",
            "timestamp": "timestamp",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          }
        }
      }
    }
  })
  @Post('/login')
  public async login(@Body() userLoginDto: LoginUserDto, @Res() res: Response, @Req() req: Request) {
    try {
      const data = await this.authService.loginUser(userLoginDto);
      const response = this.responseService.ReturnHttpSuccess(req, data, HttpStatus.OK);
      if (data === null) {
        return res.status(HttpStatus.UNAUTHORIZED).json(this.responseService.ReturnHttpError(req, HttpStatus.UNAUTHORIZED));
      }
      return res.status(HttpStatus.OK).json(response);
    } catch (err) {
      if (err) return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
  }


  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    content:{
      'application/json': {
        example:{
          "message": {
            "title": "Error",
            "body": "Error"
          },
          "metadata": {
            "path": "/api/auth/register",
            "statusCode": 400,
            "status": "Error",
            "message": "/api/auth/register [400] Error",
            "timestamp": "2024-04-26T07:35:11.114Z",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          }
        }
      }
    }
  })
  @ApiResponse({
    description:'User success register',
    status: HttpStatus.CREATED,
    content:{
      'application/json': {
        example:{
          "message": {
            "title": "OK",
            "body": "SUCCESS"
          },
          "metadata": {
            "path": "/api/auth/register",
            "statusCode": 201,
            "status": "OK",
            "message": "/api/auth/register [201] OK",
            "timestamp": "timestamp",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          },
          "data": {
            "name": "wira",
            "email": "user_email",
            "pic": "",
            "isAdmin": false,
            "_id": "user_id",
            "createdAt": "timestamp",
            "updatedAt": "timestamp",
            "__v": 0
          }
        }
      }
    }
  })
  @Post('/register')
  public async register(@Body() createUserDto: CreateUserDto, @Res() res: Response, @Req() req: Request) {
    const data = await this.userService.create(createUserDto);
    if(!data){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.CREATED).json(this.responseService.ReturnHttpSuccess(req, data, HttpStatus.CREATED));
  }
}
