import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { ResponseService } from 'src/common/response.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }    
    ]),
    PassportModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [UsersService, ResponseService, AuthService],
})
export class AuthModule {}
