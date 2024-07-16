/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';
// const {SwaggerTheme, SwaggerThemeNameEnum} = require('swagger-theme');
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { logger: ['log', 'error', 'warn', 'debug', 'verbose'] }
  );

  app.enableCors();

  app.setGlobalPrefix('api');

  // const theme = new SwaggerTheme();

  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('The Chat API that will be used in the chat application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('users')
    .addTag('chat')
    .addTag('message')
    .build();

  // const options = {
  //   explorer: true,
  //   customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
  // };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = 3000;

  const server =await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`http://localhost:${port}/api`);

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors:{
      origin: "http://localhost:3000"
    }
  });

  io.on('connection', (socket) => {
    console.log("Connected to socket.io");
    let userData:any = '';
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      userData = userData;
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User joined room :"+room);
    });

    socket.on("typing", (room) => {socket.in(room).emit("typing")});
    socket.on("stop typing", (room) => {socket.in(room).emit("stop typing")});

    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;

      if(!chat.users) return console.log("chat.users not defined");

      chat.users.forEach((user) => {
        if(user._id == newMessageRecieved.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
    
    socket.off("setup", () => {
      console.log("User Disconnected");
      socket.leave(userData._id);
    });
  });

}
bootstrap();
