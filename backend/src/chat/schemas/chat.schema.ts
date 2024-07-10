import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/users.schema';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<Chat>

const schemaOpts = {
    timestamps: true
}

@Schema(schemaOpts)
export class Chat{
    [x: string]: any;
    @Prop({trim: true})
    name:string

    @Prop({default: false})
    isGroupChat: Boolean

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] })
    users: User[]

    @Prop({ref: 'Message'})
    latestMessage: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    gropupAdmin: User
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

module.exports = Chat;