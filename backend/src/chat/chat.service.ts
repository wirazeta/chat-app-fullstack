import { Injectable } from '@nestjs/common';
import { AccessChatDto, CreateChatDto } from './dto/chat-query.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class ChatService {
  @InjectModel('Chat') private chatModel: Model<Chat>
  @InjectModel('User') private userModel: Model<User>
  create(createChatDto: CreateChatDto, userId: string) {
    return userId;
  }

  async accessChat(userId: string, accessChatDto: AccessChatDto) {
    const userId1 = Types.ObjectId.createFromHexString(userId);
    const userId2 = Types.ObjectId.createFromHexString(accessChatDto.userId);
    const userIds = [userId1, userId2];
    var isChat = await this.chatModel.find({
      isGroupChat: false,
      users:{
        $all:userIds
      }
    })
      .populate("users", "-password")
      .populate("latestMessage");
    console.log(isChat);
    isChat = await this.userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      return isChat[0];
    }
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: userIds,
    };

    try {
      const createdChat = await this.chatModel.create(chatData);
      const fullChat = (await this.chatModel.findOne({ _id: createdChat._id })).populate(
        "users",
        "-password"
      );
      return fullChat;
    } catch (err) {
      throw err;
    }
  }

  async findAll(userId: string) {
    try{
      const chats = await this.chatModel.find({
        users: {
          $in: [new Types.ObjectId(userId)]
        }
      })
      .populate("users", "-passowrd")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1})
      .then(async (results) => {
        results = await this.userModel.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email"
        });
        console.log(results);
        return results
      });
      return chats;
    }catch(err){
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
