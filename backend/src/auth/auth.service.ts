import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto, UserQueryDto } from 'src/users/dto/user-query.dto';
import { User } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService:UsersService,
        private readonly jwtService:JwtService,
        @InjectModel(User.name) private readonly userModel:Model<User>,
    ){}

    async validateUser (email: string, password: string): Promise<any> {
        const param = new UserQueryDto();
        param.email = email;

        const user = await this.userModel.findOne(param);

        if(!user){
            throw new NotAcceptableException('User not found');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if(user && passwordValid){
            return user;
        }
        return null
    }

    async loginUser(loginUserDto: LoginUserDto){
        try{
            const { email, password } = loginUserDto;
            const user = await this.userModel.findOne({email: email}).exec();

            if(user && user.matchPassword(password)){
                const payload = { sub: user._id };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            }else{
                return null;
            }
        }catch(err){
            console.log(err);
            if(err) throw new Error('Failed to login');
        }
    }
}
