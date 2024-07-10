import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/users.schema';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<Chat>

const schemaOpts = {
    timestamps: true
}

@Schema(schemaOpts)
export class Chat {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    users: User[]

    @Prop()
    groupName: string
    
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    createdBy: User

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    })
    latestMessage: Message
}


export const ChatSchema = SchemaFactory.createForClass(Chat);

module.exports = Chat;