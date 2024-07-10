import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Chat } from "src/chat/schemas/chat.schema";
import { User } from "src/users/schemas/users.schema";

@Schema()
export class Message {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    sender: User

    @Prop({trim: true})
    content: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ChatModel'})
    chat: Chat

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]})
    readBy: User[]
}

export const MessageSchema = SchemaFactory.createForClass(Message);

module.exports = Message;