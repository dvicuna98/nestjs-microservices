import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsServiceController {
  private readonly logger = new Logger(NotificationsServiceController.name);

  @EventPattern('notification.send') // 👈
  sendNotification(@Payload() data: unknown) {
    // In the real-world application, this service would be responsible for notifying other services (or user) about the alarm.
    // For example, it could send an email to the building manager/department about the alarm.
    // It could also send an SMS message to the maintenance team.

    this.logger.debug(
        `Sending notification about the alarm: ${JSON.stringify(data)}`,
    );
  }
}