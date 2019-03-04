import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import Config from '@app/config';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { swagger } from './shared/swagger';
import * as expressSession from 'express-session'
import { WsAdapter } from '@nestjs/websockets';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
  // Connecting sockets to the server and adding them to the request
  // so that we can access them later in the controller
  const io = socketio(app.getHttpServer());
  app.set('io', io);

  swagger(app);
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  // app.use(csurf()); // Enables CSRF. But it needs to be configured correctly.
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));
  app.use(expressSession({
    secret: Config.JWT_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: Config.SESSION_EXPIRES_IN
    }
  }))

  await app.listen(Config.APP_PORT);
  Logger.log(`Server running on http://localhost:${Config.APP_PORT}`, 'Bootstrap');
}
bootstrap();
