import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddUserToGroupChatDto, CreateChatDto, RemoveFromGroupDto, RenameGroupChatDto } from '../dto/chat-query.dto';
import { TokenGuard } from 'src/token/token.guard';
import { ResponseService } from 'src/common/response.util';

@ApiTags('chat')
@Controller()
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private responseService: ResponseService,
  ) {}

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createChatDto: CreateChatDto, @Req() req, @Res() res) {
    console.log(req.user.sub);
    const createGroupChat = await this.groupService.create(createChatDto, req.user.sub);
    if(!createGroupChat){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.CREATED).json(this.responseService.ReturnHttpSuccess(req, createGroupChat, HttpStatus.CREATED));
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  async renameGroup(@Param('id') id: string, @Body() renameGroupChatDto: RenameGroupChatDto, @Res() res, @Req() req) {
    const rename = await this.groupService.renameGroup(id, renameGroupChatDto);
    if(!rename){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, rename, HttpStatus.OK));
  }

  @Put(':id')
  async removeFromGroup(@Param('id') id: string, @Body() removeFromGroupDto: RemoveFromGroupDto, @Res() res, @Req() req){
    const removeFromGroup = await this.groupService.removeFromGroup(id, removeFromGroupDto);
    if(!removeFromGroup){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, removeFromGroup, HttpStatus.OK));
  }

  @Put([':id', ':id/addUser'])
  async addUserToGroup(@Param('id') id:string, @Body() addUserToGroupChatDto: AddUserToGroupChatDto, @Res() res, @Req() req){
    const addUser = await this.groupService.addUserToGroupChat(id, addUserToGroupChatDto);
    if(!addUser){
      return res.status(HttpStatus.BAD_REQUEST).json(this.responseService.ReturnHttpError(req, HttpStatus.BAD_REQUEST));
    }
    return res.status(HttpStatus.OK).json(this.responseService.ReturnHttpSuccess(req, addUser, HttpStatus.OK));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
