import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(...) -> This line configures a global validation pipe for your entire Nest.js application. A global pipe applied to all incoming requests and response.
  // whitelist: true -> When set to true, this option ensures that only properties defined in your DTO classes are allowed during validation. Any additional properties not defined in the DTO will be stripped out.
  app.use(cookieSession({
    keys: ['asdfasdf'] // This string will use to encrypt the information that is going to stored inside the cookie.
  }));
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();
