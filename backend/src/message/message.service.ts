import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/message-query.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Chat } from 'src/chat/schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class MessageService {
  @InjectModel('Chat') private chatModel: Model<Chat>
  @InjectModel('Message') private messageModel: Model<Message>
  @InjectModel('User') private userModel: Model<User>

  async create(createMessageDto: CreateMessageDto, userId: string) {
    const newMessage = {
      sender: userId,
      content: createMessageDto.content,
      chat: createMessageDto.chatId,
    }

    try {
      const message = await this.messageModel.create(newMessage);
      
      // Bad example for input User document to variable message but I don't have choice :D
      var latestMessage: any= await this.messageModel.findById(message._id)
      .populate([
        {path: "chat"},
        {path: "sender", select: "name pic"},
      ]);
      latestMessage = await this.userModel.populate(latestMessage, {
        path: "chat.users",
        select: "name pic email"
      });
      await this.chatModel.findByIdAndUpdate(createMessageDto.chatId, { latestMessage: latestMessage });
      console.log(latestMessage);
      return latestMessage;
    } catch (err) {
      return err
    }
  }

  async findAll(chatId: string) {
    console.log(chatId);
    try{
      const message = await this.messageModel.find({
        chat: chatId
      }).populate("sender", "name pic")
      .populate("chat");
      console.log(message);
      return message;
    }catch(err){
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
