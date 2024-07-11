import { Injectable } from '@nestjs/common';
import { AccessChatDto, CreateChatDto } from './dto/chat-query.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { Model, Types} from 'mongoose';
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
      users: {
        $in:{
          userIds
        }
      }
    })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await this.userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if(isChat.length > 0) {
  return isChat[0];
}
var chatData = {
  chatName: "sender",
  isGroupChat: false,
  users: [accessChatDto.userId, userId],
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

findAll() {
  return `This action returns all chat`;
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
