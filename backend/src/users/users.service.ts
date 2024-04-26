import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginUserDto, UserQueryDto } from './dto/user-query.dto';
import { UsersProfile } from './interfaces/users.interfaces';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll(id: String) {
    const user = await this.userModel.findById(id);
    // const ability = this.caslAbilityFactory.createForUser(user);
    // if(!ability.can(Action.Manage, User)){
    //   return;
    // }
    // return 'This action returns all users';
    return await this.userModel.find().exec();
  }

  async findOne(id: String) {
    const user = await this.userModel.findById(id);
    if(!user){
      return;
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updateValue = updateUserDto;
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
