import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<Chat>

const schemaOpts = {
    timestamps: true
}

@Schema(schemaOpts)
export class Chat{
    @Prop()
    chatName: {type: String, trim: true}

    @Prop()
    isGroupChat: {type: Boolean, default: false}

    @Prop()
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

    @Prop()
    latestMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}

    @Prop()
    gropupAdmin: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

module.exports = Chat;