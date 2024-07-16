import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { ResponseService } from 'src/common/response.util';
import { Chat, ChatSchema } from 'src/chat/schemas/chat.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { GroupModule } from 'src/chat/group/group.module';

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
  controllers: [MessageController],
  providers: [MessageService, ResponseService],
})
export class MessageModule {}
