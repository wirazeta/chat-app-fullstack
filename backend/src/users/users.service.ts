import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    // Check if user exists
    const userExist = await this.userModel.findOne({ email });

    if (userExist) {
      throw new Error('User already exists');
    }

    const user = new this.userModel(createUserDto);

    return await user.save();
  }

  async findAll() {
    // return 'This action returns all users';
    return await this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateValue = updateUserDto;
    return `${updateValue}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
