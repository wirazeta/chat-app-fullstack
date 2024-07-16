import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { GroupModule } from './chat/group/group.module';
import { RouterModule } from '@nestjs/core';
dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    UsersModule, 
    AuthModule, 
    CaslModule, 
    ChatModule, 
    MessageModule,
    GroupModule,
    RouterModule.register(
      [
        // {
        //   path: 'api',
        //   module: AppModule,
        // },
        {
          path: 'users',
          module: UsersModule,
        },
        {
          path:'chat',
          module: ChatModule,
          children:[
            {
              path: 'group',
              module: GroupModule
            }
          ]
        },
        {
          path: 'message',
          module: MessageModule
        }
      ]
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
