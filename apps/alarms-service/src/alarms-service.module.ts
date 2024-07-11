import {Module} from '@nestjs/common';
import {AlarmsServiceController} from './alarms-service.controller';
import {AlarmsServiceService} from './alarms-service.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {MESSAGE_BROKER} from "./constants";

@Module({
  imports: [
      ClientsModule.register([
        {
          name: MESSAGE_BROKER,
          transport: Transport.NATS,
          options:{
            servers: process.env.NATS_URL
          }
        }
      ])
  ],
  controllers: [AlarmsServiceController],
  providers: [AlarmsServiceService],
})
export class AlarmsServiceModule {}
