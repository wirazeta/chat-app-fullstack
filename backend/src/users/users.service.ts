import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginUserDto, UserQueryDto } from './dto/user-query.dto';
import { UsersProfile } from './interfaces/users.interfaces';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/casl-ability.factory/action-ability';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersProfile> {
    const { email } = createUserDto;
    // Check if user exists
    const userExist = await this.userModel.findOne({ email });

    if (userExist) {
      return;
    }

    const user = new this.userModel(createUserDto);

    return await user.save();
  }

  async findAll() {
    const users = await this.userModel.find();
    // const ability = this.caslAbilityFactory.createForUser(user);
    // if(!ability.can(Action.Manage, User)){
    //   return;
    // }
    // return 'This action returns all users';
    return users;
  }

  async findOne(id: String) {
    const user = await this.userModel.findById(id);
    if(!user){
      return;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateValue = await this.userModel.updateOne({ _id: id }, updateUserDto);
    if(!updateValue){
      return;
    }
    return updateValue;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return;
    }
    const deleteValue = await this.userModel.deleteOne({_id: id}).then((data) => {
      // if(data.deletedCount === 0) return;
      return {
        deletedCount: data.deletedCount
      }
    });
    // if(!deleteValue){
    //   return;
    // }
    return !deleteValue;
  }
}
