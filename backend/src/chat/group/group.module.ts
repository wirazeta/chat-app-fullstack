import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from '../schemas/chat.schema';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { MessageSchema } from 'src/message/schemas/message.schema';
import { ResponseService } from 'src/common/response.util';

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
  controllers: [GroupController],
  providers: [GroupService, ResponseService],
})
export class GroupModule {}
