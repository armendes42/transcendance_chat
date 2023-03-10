import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppGateway } from './chat/chat.gateway';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const gateway = app.get(AppGateway);
  app.useWebSocketAdapter(gateway);
  await app.listen(3333);
}
bootstrap();
