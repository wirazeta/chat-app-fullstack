import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/chat-query.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TokenGuard } from 'src/token/token.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Post()
  async createGroupChat(@Body() createChatDto: CreateChatDto, @Req() req, @Res() res) {
    const groupChat = await this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
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
