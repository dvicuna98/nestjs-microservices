import { Module } from '@nestjs/common';
import { AlarmsClassifierServiceController } from './alarms-classifier-service.controller';
import { AlarmsClassifierServiceService } from './alarms-classifier-service.service';

@Module({
  imports: [],
  controllers: [AlarmsClassifierServiceController],
  providers: [AlarmsClassifierServiceService],
})
export class AlarmsClassifierServiceModule {}
