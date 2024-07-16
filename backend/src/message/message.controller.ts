import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/message-query.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/common/response.util';
import { TokenGuard } from 'src/token/token.guard';

@ApiTags('message')
@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private responseService: ResponseService
  ) {}

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res() res, @Req() req) {
    const created = await this.messageService.create(createMessageDto, req.user.sub);
    if(!created){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.CREATED).json(this.responseService.ReturnHttpSuccess(req, created, HttpStatus.CREATED));
  }

  @Get(':chatId')
  async findAll(@Param(':chatId') chatId: string, @Req() req, @Res() res) {
    const messages = await this.messageService.findAll(chatId);
    if(!messages){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, messages, HttpStatus.OK));
  }

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
