import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import Config from '@app/config';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { swagger } from './shared/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  // app.use(csurf()); // Enables CSRF. But it needs to be configured correctly.
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));

  await app.listen(Config.APP_PORT);
  Logger.log(`Server running on http://localhost:${Config.APP_PORT}`, 'Bootstrap');
}
bootstrap();
