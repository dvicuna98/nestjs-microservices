import { Module } from '@nestjs/common';
import { AlarmsGeneratorService } from './alarms-generator.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ALARMS_SERVICE } from './constants';
import * as process from "node:process";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: ALARMS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'workflows-service'
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AlarmsGeneratorService],
})
export class AlarmsGeneratorModule {}