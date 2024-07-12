import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from '../dto/chat-query.dto';
import { TokenGuard } from 'src/token/token.guard';

@ApiTags('chat')
@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Req() req, @Res() res) {
    return this.groupService.create(createChatDto, req.user.sub);
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
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
