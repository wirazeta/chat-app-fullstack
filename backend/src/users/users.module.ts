import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '30d' },
    }),
    CaslModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
