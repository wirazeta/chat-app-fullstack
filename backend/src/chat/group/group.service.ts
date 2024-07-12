import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateChatDto } from '../dto/chat-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../schemas/chat.schema';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class GroupService {
  @InjectModel('Chat') private chatModel: Model<Chat>;
  @InjectModel('User') private userModel: Model<User>;
  create(createChatDto: CreateChatDto, userId: string) {
    if(!createChatDto.users || !createChatDto.chatName){
      return;
    }

    createChatDto.users.push();

  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
