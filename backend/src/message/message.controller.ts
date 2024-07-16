import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/message-query.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/common/response.util';
import { TokenGuard } from 'src/token/token.guard';

@ApiTags('message')
@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private responseService: ResponseService
  ) { }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Send message to chat',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/message",
              "statusCode": 201,
              "status": "OK",
              "message": "/api/message [201] OK",
              "timestamp": "2024-07-16T08:18:47.332Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": {
              "_id": "66962ce66b636445e5d40636",
              "sender": {
                "_id": "65d972caa3b41414ba89fa46",
                "name": "wira1",
                "pic": "string"
              },
              "content": "test kirim pesan 1",
              "chat": {
                "_id": "669627cc6ae694debf8242b5",
                "users": [
                  {
                    "_id": "65d972caa3b41414ba89fa46",
                    "name": "wira1",
                    "email": "string",
                    "pic": "string"
                  },
                  {
                    "_id": "65d9814b59cdc995e6a26c42",
                    "name": "wira",
                    "email": "wira2@gmail.com",
                    "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  },
                  {
                    "_id": "65d98b8d221045c9dafbbf69",
                    "name": "wira",
                    "email": "wira3",
                    "pic": "string"
                  }
                ],
                "chatName": "testing ganti nama group 2",
                "isGroupChat": false,
                "createdAt": "2024-07-16T07:57:00.643Z",
                "updatedAt": "2024-07-16T08:14:46.449Z",
                "__v": 0
              },
              "readBy": [],
              "__v": 0
            }
          }
        }
      }
    }
  )
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res() res, @Req() req) {
    const created = await this.messageService.create(createMessageDto, req.user.sub);
    if (!created) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.CREATED).json(this.responseService.ReturnHttpSuccess(req, created, HttpStatus.CREATED));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiResponse(
    {
      status: HttpStatus.OK,
      description: 'Get all messages from a chat',
      content: {
        'application/json': {
          example: {
            "message": {
              "title": "OK",
              "body": "SUCCESS"
            },
            "metadata": {
              "path": "/api/message/669627cc6ae694debf8242b5",
              "statusCode": 200,
              "status": "OK",
              "message": "/api/message/669627cc6ae694debf8242b5 [200] OK",
              "timestamp": "2024-07-16T08:19:26.771Z",
              "requestId": "requestId",
              "timeElapsed": "0.0"
            },
            "data": [
              {
                "_id": "66962ce66b636445e5d40636",
                "sender": {
                  "_id": "65d972caa3b41414ba89fa46",
                  "name": "wira1",
                  "pic": "string"
                },
                "content": "test kirim pesan 1",
                "chat": {
                  "_id": "669627cc6ae694debf8242b5",
                  "users": [
                    "65d972caa3b41414ba89fa46",
                    "65d9814b59cdc995e6a26c42",
                    "65d98b8d221045c9dafbbf69"
                  ],
                  "chatName": "testing ganti nama group 2",
                  "isGroupChat": false,
                  "createdAt": "2024-07-16T07:57:00.643Z",
                  "updatedAt": "2024-07-16T08:18:47.252Z",
                  "__v": 0,
                  "latestMessage": "66962ce66b636445e5d40636"
                },
                "readBy": [],
                "__v": 0
              }
            ]
          }
        }
      }
    }
  )
  @Get(':chatId')
  async findAll(@Param('chatId') chatId: string, @Req() req, @Res() res) {
    console.log(chatId);
    const messages = await this.messageService.findAll(chatId);
    if (!messages) {
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, messages, HttpStatus.OK));
  }

  // @UseGuards(TokenGuard)
  // @ApiBearerAuth()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
