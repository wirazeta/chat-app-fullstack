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

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`http://localhost:${port}/api`);

}
bootstrap();
