import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, CreateUserDto } from './dto/user-query.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TokenGuard } from 'src/token/token.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { User } from './schemas/users.schema';
import { ResponseService } from 'src/common/response.util';

enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private responseService: ResponseService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) { }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All Users',
    content: {
      'application/json': {
        example: {
          "message": {
            "title": "OK",
            "body": "SUCCESS"
          },
          "metadata": {
            "path": "/api/users",
            "statusCode": 200,
            "status": "OK",
            "message": "/api/users [200] OK",
            "timestamp": "2024-04-26T08:38:29.161Z",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          },
          "data": [
            {
              "_id": "user_id",
              "name": "wira",
              "email": "wira1@gmail.com",
              "pic": "string",
              "isAdmin": true,
              "createdAt": "timestamp",
              "updatedAt": "timestamp",
              "__v": 0
            },
            {
              "_id": "user_id",
              "name": "wira",
              "email": "wira2@gmail.com",
              "pic": "string",
              "isAdmin": false,
              "createdAt": "timestamp",
              "updatedAt": "timestamp",
              "__v": 0
            }
          ]
        }
      }
    }
  })
  @Get()
  async findAll(@Res() res: Response, @Req() req) {
    const data = await this.usersService.findAll();
    if (!data) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, data, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get User By Id',
    content: {
      'application/json': {
        example: {
          "message": {
            "title": "OK",
            "body": "SUCCESS"
          },
          "metadata": {
            "path": "/api/users/662b54d1648618839d5302c2",
            "statusCode": 200,
            "status": "OK",
            "message": "/api/users/662b54d1648618839d5302c2 [200] OK",
            "timestamp": "2024-04-26T08:40:01.895Z",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          },
          "data": {
            "_id": "user_id",
            "name": "wira",
            "email": "wira11@gmail.com",
            "pic": "string",
            "isAdmin": false,
            "createdAt": "timestamp",
            "updatedAt": "timestamp",
            "__v": 0
          }
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: 400,
    content: {
      'application/json': {
        example: {
          "message": {
            "title": "Error",
            "body": "Error"
          },
          "metadata": {
            "path": "/api/users/user_id",
            "statusCode": 400,
            "status": "Error",
            "message": "/api/users/user_id [400] Error",
            "timestamp": "timestamp",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          }
        }
      }
    }
  })
  @Get(':id')
  async findOne(@Param('id') id: String, @Res() res: Response, @Req() req) {
    const user = await this.usersService.findOne(req.user.sub);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Read, User)) {
      return res.status(HttpStatus.UNAUTHORIZED).json(this.responseService.ReturnHttpError(req, HttpStatus.UNAUTHORIZED));
    }
    const data = await this.usersService.findOne(id);
    if (!data) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, data, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update User',
    content: {
      'application/json': {
        example: {
          "message": {
            "title": "OK",
            "body": "SUCCESS"
          },
          "metadata": {
            "path": "/api/users/65d972caa3b41414ba89fa46",
            "statusCode": 200,
            "status": "OK",
            "message": "/api/users/65d972caa3b41414ba89fa46 [200] OK",
            "timestamp": "2024-05-11T13:31:17.440Z",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          },
          "data": {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
          }
        }
      }
    }
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto, @Req() req, @Res() res: Response) {
    const update = await this.usersService.update(id, userUpdateDto);
    if (!update) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, update, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete User',
    content: {
      'application/json': {
        example: {
          "message": {
            "title": "OK",
            "body": "SUCCESS"
          },
          "metadata": {
            "path": "/api/users/65dac29c3f01c34147d85ede",
            "statusCode": 200,
            "status": "OK",
            "message": "/api/users/65dac29c3f01c34147d85ede [200] OK",
            "timestamp": "2024-07-09T02:37:07.263Z",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          },
          "data": {
            "deletedCount": 0
          }
        }
      }
    }
  })
  @ApiBadRequestResponse(
    {
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
              "path": "/api/users/65d98b8d221045c9dafbbf6l",
              "statusCode": 400,
              "status": "Error",
              "message": "/api/users/65d98b8d221045c9dafbbf6l [400] Error",
              "timestamp": "2024-07-09T03:09:07.509Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            }          
          }
        }
      }
    }
  )
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    content:{
      'application/json':{
        example:{
          "message": {
            "title": "Error",
            "body": "Error"
          },
          "metadata": {
            "path": "/api/users/65dac29c3f01c34147d85ede",
            "statusCode": 401,
            "status": "Error",
            "message": "/api/users/65dac29c3f01c34147d85ede [401] Error",
            "timestamp": "2024-07-09T02:29:56.885Z",
            "requestId": "requestId",
            "timeElapsed": "0.0"
          }        
        }
      }
    }
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req, @Res() res: Response) {
    const user = await this.usersService.findOne(req.user.sub);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, User)) {
      return res.status(HttpStatus.UNAUTHORIZED).json(this.responseService.ReturnHttpError(req, HttpStatus.UNAUTHORIZED));
    }
    const deleteData = await this.usersService.remove(id);
    console.log(deleteData);
    if (!deleteData) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, deleteData, HttpStatus.OK));
  }
}
