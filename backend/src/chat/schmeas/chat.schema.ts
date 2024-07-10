import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/users.schema';
import { Message } from '../../message/schemas/message.schema';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<Chat>

const schemaOpts = {
    timestamps: true
}

@Schema(schemaOpts)
export class Chat extends Document{
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: () => 'User'
    })
    users: User[]

    @Prop()
    groupName: string
    
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: () => 'User'
    })
    createdBy: User

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: () => 'Message'
    })
    latestMessage: Message

    @Prop({default: false})
    isGroupChat: boolean
}


export const ChatSchema = SchemaFactory.createForClass(Chat);
export const ChatModel = mongoose.model('Chat', ChatSchema);

module.exports = Chat;