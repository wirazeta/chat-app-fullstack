import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserToGroupChatDto, CreateChatDto, RemoveFromGroupDto, RenameGroupChatDto } from '../dto/chat-query.dto';
import { TokenGuard } from 'src/token/token.guard';
import { ResponseService } from 'src/common/response.util';

@ApiTags('chat')
@Controller()
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private responseService: ResponseService,
  ) { }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Create group chat',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/chat/group",
              "statusCode": 201,
              "status": "OK",
              "message": "/api/chat/group [201] OK",
              "timestamp": "2024-07-16T08:08:53.519Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": {
              "_id": "66962a95448b9b02e053e2e4",
              "users": [
                {
                  "_id": "65d972caa3b41414ba89fa46",
                  "name": "wira1",
                  "email": "string",
                  "pic": "string",
                  "isAdmin": true,
                  "createdAt": "2024-02-24T04:38:34.858Z",
                  "updatedAt": "2024-05-11T13:31:17.368Z",
                  "__v": 0
                },
                {
                  "_id": "65d9814b59cdc995e6a26c42",
                  "name": "wira",
                  "email": "wira2@gmail.com",
                  "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                  "isAdmin": false,
                  "createdAt": "2024-02-24T05:40:27.118Z",
                  "updatedAt": "2024-02-24T05:40:27.118Z",
                  "__v": 0
                },
                {
                  "_id": "65d98b8d221045c9dafbbf69",
                  "name": "wira",
                  "email": "wira3",
                  "pic": "string",
                  "isAdmin": false,
                  "createdAt": "2024-02-24T06:24:13.960Z",
                  "updatedAt": "2024-02-24T06:24:13.960Z",
                  "__v": 0
                }
              ],
              "chatName": "test bikin group 2",
              "groupAdmin": {
                "_id": "65d972caa3b41414ba89fa46",
                "name": "wira1",
                "email": "string",
                "pic": "string",
                "isAdmin": true,
                "createdAt": "2024-02-24T04:38:34.858Z",
                "updatedAt": "2024-05-11T13:31:17.368Z",
                "__v": 0
              },
              "isGroupChat": true,
              "createdAt": "2024-07-16T08:08:53.267Z",
              "updatedAt": "2024-07-16T08:08:53.267Z",
              "__v": 0
            }
          }
        }
      }
    }
  )
  @Post()
  async create(@Body() createChatDto: CreateChatDto, @Req() req, @Res() res) {
    console.log(req.user.sub);
    const createGroupChat = await this.groupService.create(createChatDto, req.user.sub);
    if (!createGroupChat) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.CREATED).json(this.responseService.ReturnHttpSuccess(req, createGroupChat, HttpStatus.CREATED));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Rename chat group name',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/chat/group/669627cc6ae694debf8242b5",
              "statusCode": 200,
              "status": "OK",
              "message": "/api/chat/group/669627cc6ae694debf8242b5 [200] OK",
              "timestamp": "2024-07-16T08:11:56.035Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": {
              "_id": "669627cc6ae694debf8242b5",
              "users": [
                {
                  "_id": "65d972caa3b41414ba89fa46",
                  "name": "wira1",
                  "email": "string",
                  "pic": "string",
                  "isAdmin": true,
                  "createdAt": "2024-02-24T04:38:34.858Z",
                  "updatedAt": "2024-05-11T13:31:17.368Z",
                  "__v": 0
                },
                {
                  "_id": "65d9814b59cdc995e6a26c42",
                  "name": "wira",
                  "email": "wira2@gmail.com",
                  "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                  "isAdmin": false,
                  "createdAt": "2024-02-24T05:40:27.118Z",
                  "updatedAt": "2024-02-24T05:40:27.118Z",
                  "__v": 0
                }
              ],
              "chatName": "testing ganti nama group 2",
              "isGroupChat": false,
              "createdAt": "2024-07-16T07:57:00.643Z",
              "updatedAt": "2024-07-16T08:11:55.890Z",
              "__v": 0
            }
          }
        }
      }
    }
  )
  @Patch(':id')
  async renameGroup(@Param('id') id: string, @Body() renameGroupChatDto: RenameGroupChatDto, @Res() res, @Req() req) {
    const rename = await this.groupService.renameGroup(id, renameGroupChatDto);
    if (!rename) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, rename, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Remove user from group chat',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/chat/group/669627cc6ae694debf8242b5",
              "statusCode": 200,
              "status": "OK",
              "message": "/api/chat/group/669627cc6ae694debf8242b5 [200] OK",
              "timestamp": "2024-07-16T08:13:16.749Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": {
              "_id": "669627cc6ae694debf8242b5",
              "users": [
                {
                  "_id": "65d972caa3b41414ba89fa46",
                  "name": "wira1",
                  "email": "string",
                  "pic": "string",
                  "isAdmin": true,
                  "createdAt": "2024-02-24T04:38:34.858Z",
                  "updatedAt": "2024-05-11T13:31:17.368Z",
                  "__v": 0
                },
                {
                  "_id": "65d9814b59cdc995e6a26c42",
                  "name": "wira",
                  "email": "wira2@gmail.com",
                  "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                  "isAdmin": false,
                  "createdAt": "2024-02-24T05:40:27.118Z",
                  "updatedAt": "2024-02-24T05:40:27.118Z",
                  "__v": 0
                }
              ],
              "chatName": "testing ganti nama group 2",
              "isGroupChat": false,
              "createdAt": "2024-07-16T07:57:00.643Z",
              "updatedAt": "2024-07-16T08:13:16.597Z",
              "__v": 0
            }
          }
        }
      }
    }
  )
  @Put(':id')
  async removeFromGroup(@Param('id') id: string, @Body() removeFromGroupDto: RemoveFromGroupDto, @Res() res, @Req() req) {
    const removeFromGroup = await this.groupService.removeFromGroup(id, removeFromGroupDto);
    if (!removeFromGroup) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, removeFromGroup, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Add user to group chat',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/chat/group/669627cc6ae694debf8242b5/addUser",
              "statusCode": 200,
              "status": "OK",
              "message": "/api/chat/group/669627cc6ae694debf8242b5/addUser [200] OK",
              "timestamp": "2024-07-16T08:14:46.607Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": {
              "_id": "669627cc6ae694debf8242b5",
              "users": [
                {
                  "_id": "65d972caa3b41414ba89fa46",
                  "name": "wira1",
                  "email": "string",
                  "pic": "string",
                  "isAdmin": true,
                  "createdAt": "2024-02-24T04:38:34.858Z",
                  "updatedAt": "2024-05-11T13:31:17.368Z",
                  "__v": 0
                },
                {
                  "_id": "65d9814b59cdc995e6a26c42",
                  "name": "wira",
                  "email": "wira2@gmail.com",
                  "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                  "isAdmin": false,
                  "createdAt": "2024-02-24T05:40:27.118Z",
                  "updatedAt": "2024-02-24T05:40:27.118Z",
                  "__v": 0
                },
                {
                  "_id": "65d98b8d221045c9dafbbf69",
                  "name": "wira",
                  "email": "wira3",
                  "pic": "string",
                  "isAdmin": false,
                  "createdAt": "2024-02-24T06:24:13.960Z",
                  "updatedAt": "2024-02-24T06:24:13.960Z",
                  "__v": 0
                }
              ],
              "chatName": "testing ganti nama group 2",
              "isGroupChat": false,
              "createdAt": "2024-07-16T07:57:00.643Z",
              "updatedAt": "2024-07-16T08:14:46.449Z",
              "__v": 0
            }
          }
        }
      }
    }
  )
  @Put([':id', ':id/addUser'])
  async addUserToGroup(@Param('id') id: string, @Body() addUserToGroupChatDto: AddUserToGroupChatDto, @Res() res, @Req() req) {
    const addUser = await this.groupService.addUserToGroupChat(id, addUserToGroupChatDto);
    if (!addUser) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, addUser, HttpStatus.OK));
  }


  // @Get()
  // findAll() {
  //   return this.groupService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupService.remove(+id);
  // }
}
