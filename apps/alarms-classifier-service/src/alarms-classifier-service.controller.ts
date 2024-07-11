import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsClassifierServiceController {
  private readonly logger = new Logger(AlarmsClassifierServiceController.name);

  @MessagePattern('alarm.classify')
  classifyAlarm(@Payload() data: unknown) {
    // In the real-world application, this service would classify alarms (or alarm groups) using AI/ML algorithms.
    // This service would use a pre-trained model to classify alarms as either "critical", "non-critical", or "invalid".

    this.logger.debug(
        `Received new "alarm.classify" message: ${JSON.stringify(data)}`,
    );

    // Randomly return "critical", "non-critical", or "invalid".
    return {
      category: ['critical', 'non-critical', 'invalid'][
          Math.floor(Math.random() * 3)
          ],
    };
  }
}