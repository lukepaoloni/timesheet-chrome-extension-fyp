import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import Config from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Config.APP_PORT);
  Logger.log(`Server running on http://localhost:${Config.APP_PORT}`, 'Bootstrap');
}
bootstrap();
