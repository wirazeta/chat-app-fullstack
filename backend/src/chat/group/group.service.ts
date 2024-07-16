import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddUserToGroupChatDto, CreateChatDto, RemoveFromGroupDto, RenameGroupChatDto } from '../dto/chat-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class GroupService {
  @InjectModel('Chat') private chatModel: Model<Chat>;
  @InjectModel('User') private userModel: Model<User>;
  async create(createChatDto: CreateChatDto, userId: string) {
    const groupAdmin = await this.userModel.findById({ _id: new Types.ObjectId(userId) }).then((data) => { return data });
    // console.log(user);
    if (!createChatDto.userIds || !createChatDto.chatName) {
      return;
    }
    createChatDto.userIds.push(userId);

    const users = await this.userModel.find({ _id: { $in: createChatDto.userIds } });

    try {
      const createdChat = await this.chatModel.create({
        chatName: createChatDto.chatName,
        users: users,
        isGroupChat: true,
        groupAdmin: groupAdmin,
      });
      const fullGroupChat = await this.chatModel.findOne({ _id: createdChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return fullGroupChat;
    } catch (err) {
      return err
    }
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async renameGroup(id: string, renameGroupChatDto: RenameGroupChatDto) {
    try {
      const rename = await this.chatModel.findByIdAndUpdate(id, {
        chatName: renameGroupChatDto.chatName
      }, {
        new: true
      })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return rename;
    } catch (err) {
      return err;
    }
  }

  async removeFromGroup(id: string, removeFromGroupDto: RemoveFromGroupDto) {
    try {
      const remove = await this.chatModel.findByIdAndUpdate(id,
        {
          $pull: {
            users: removeFromGroupDto.userId
          }
        },
        {
          new: true
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return remove;
    } catch (err) {
      return err;
    }
  }

  async addUserToGroupChat(id: string, addUserToGroupChatDto: AddUserToGroupChatDto) {
    try {
      const addUser = await this.chatModel.findByIdAndUpdate(id, {
        $push: {
          users: addUserToGroupChatDto.userId,
        },
      },
        {
          new: true,
        }
      ).populate("users", "-password")
      .populate("groupAdmin", "-password");
      return addUser;
    }catch(err){
      return err
    }
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
