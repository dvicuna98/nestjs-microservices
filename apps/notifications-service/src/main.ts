import { NestFactory } from '@nestjs/core';
import { NotificationsServiceModule } from './notifications-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL],
            queue: 'workflows-service',
            noAck:false
        },
      },
      { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();