import { NestFactory } from '@nestjs/core';
import { AlarmsClassifierServiceModule } from './alarms-classifier-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AlarmsClassifierServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
          queue: 'alarms-classifier-service',
        },
      },
      { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

