import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/users.schema';
import { Message } from '../../message/schemas/message.schema';
import * as bcrypt from 'bcryptjs';

export type ChatDocument = HydratedDocument<Chat>

const schemaOpts = {
    timestamps: true
}

@Schema(schemaOpts)
export class Chat{
    [x: string]: any;

    @Prop({type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: () => 'User'}]
    })
    users: User[]

    @Prop()
    chatName: string
    
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: () => 'User'
    })
    groupAdmin: User

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: () => 'Message'
    })
    latestMessage: Message

    @Prop({default: false})
    isGroupChat: boolean
}

export const ChatSchema = SchemaFactory.createForClass(Chat);