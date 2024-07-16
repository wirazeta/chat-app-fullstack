import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AccessChatDto, CreateChatDto } from './dto/chat-query.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/token/token.guard';
import { ResponseService } from 'src/common/response.util';

@ApiTags('chat')
@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private responseService: ResponseService
  ) {}


  // Create or Fetch One to One Chat
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Fetch chat with other user',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/chat",
              "statusCode": 200,
              "status": "OK",
              "message": "/api/chat [200] OK",
              "timestamp": "2024-07-16T07:57:00.864Z",
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
              "chatName": "sender",
              "isGroupChat": false,
              "createdAt": "2024-07-16T07:57:00.643Z",
              "updatedAt": "2024-07-16T07:57:00.643Z",
              "__v": 0
            }
          }
        }
      }
    }
  )
  @Post()
  async accessChat(@Body() accessChatDto: AccessChatDto, @Req() req, @Res() res){
    const accessChat = await this.chatService.accessChat(req.user.sub, accessChatDto);
    if(!accessChat){
      return res.status(HttpStatus.NOT_FOUND).json(this.responseService.ReturnHttpError(req, HttpStatus.NOT_FOUND));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, accessChat, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Get All Chats',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/chat",
              "statusCode": 200,
              "status": "OK",
              "message": "/api/chat [200] OK",
              "timestamp": "2024-07-16T07:59:07.605Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": [
              {
                "_id": "6690900711d3381ab3444278",
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
                "chatName": "sender",
                "isGroupChat": false,
                "createdAt": "2024-07-12T02:08:07.626Z",
                "updatedAt": "2024-07-12T02:08:07.626Z",
                "__v": 0
              }
            ]
          }
        }
      }
    }
  )
  @Get()
  async findAll(@Req() req, @Res() res) {
    const chats = await this.chatService.findAll(req.user.sub);
    if(!chats){
      return res.status(HttpStatus.NOT_FOUND).json(this.responseService.ReturnHttpError(req, HttpStatus.NOT_FOUND));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, chats, HttpStatus.OK));
  }
}
