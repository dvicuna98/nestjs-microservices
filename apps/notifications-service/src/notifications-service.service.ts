import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
