import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { MessageSchema } from 'src/message/schemas/message.schema';
import { ChatModel } from './schmeas/chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: ChatModel.name,
    schema: ChatSchema
  }]), MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }]), MongooseModule.forFeature([{
    name: 'Message',
    schema: MessageSchema
  }])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
