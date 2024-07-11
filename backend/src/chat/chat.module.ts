import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { MessageSchema } from 'src/message/schemas/message.schema';
import { ResponseService } from 'src/common/response.util';
import { GroupModule } from './group/group.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Chat.name,
    schema: ChatSchema
  }]), MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }]), MongooseModule.forFeature([{
    name: 'Message',
    schema: MessageSchema
  }]), GroupModule],
  controllers: [ChatController],
  providers: [ChatService, ResponseService],
})
export class ChatModule {}
