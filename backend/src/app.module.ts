import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
dotenv.config()

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), UsersModule, AuthModule, CaslModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
