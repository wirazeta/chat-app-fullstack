import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AccessChatDto, CreateChatDto } from './dto/chat-query.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  @Post()
  async accessChat(@Body() accessChatDto: AccessChatDto, @Req() req, @Res() res){
    const accessChat = await this.chatService.accessChat(req.user.sub, accessChatDto);
    // return accessChat;
    if(!accessChat){
      return res.status(HttpStatus.NOT_FOUND).json(this.responseService.ReturnHttpError(req, HttpStatus.NOT_FOUND));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, accessChat, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Req() req, @Res() res) {
    const chats = await this.chatService.findAll(req.user.sub);
    if(!chats){
      return res.status(HttpStatus.NOT_FOUND).json(this.responseService.ReturnHttpError(req, HttpStatus.NOT_FOUND));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, chats, HttpStatus.OK));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
