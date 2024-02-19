/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({
    required:false,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  })
  pic: string

  @Prop({
    required: true,
    default: false
  })
  isAdmin: boolean

  @Prop()
  timestamps: true
  _id: string;

  async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);    
  }

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);    
}

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema