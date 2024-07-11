import { NestFactory } from '@nestjs/core';
import { AlarmsGeneratorModule } from './alarms-generator.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(AlarmsGeneratorModule);
}
bootstrap();