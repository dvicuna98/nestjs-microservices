import {Module} from '@nestjs/common';
import {AlarmsServiceController} from './alarms-service.controller';
import {AlarmsServiceService} from './alarms-service.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {NATS_MESSAGE_BROKER, NOTIFICATION_SERVICE} from "./constants";
import * as process from "node:process";

@Module({
  imports: [
      ClientsModule.register([
        {
          name: NATS_MESSAGE_BROKER,
          transport: Transport.NATS,
          options:{
            servers: process.env.NATS_URL
          }
        },
        {
          name: NOTIFICATION_SERVICE,
          transport: Transport.RMQ,
          options:{
            urls: [process.env.RABBITMQ_URL],
            queue: 'workflows-service'
          }
        }
      ])
  ],
  controllers: [AlarmsServiceController],
  providers: [AlarmsServiceService],
})
export class AlarmsServiceModule {}
