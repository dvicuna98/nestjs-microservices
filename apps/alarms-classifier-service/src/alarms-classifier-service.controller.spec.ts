import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsClassifierServiceController } from './alarms-classifier-service.controller';
import { AlarmsClassifierServiceService } from './alarms-classifier-service.service';

describe('AlarmsClassifierServiceController', () => {
  let alarmsClassifierServiceController: AlarmsClassifierServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlarmsClassifierServiceController],
      providers: [AlarmsClassifierServiceService],
    }).compile();

    alarmsClassifierServiceController = app.get<AlarmsClassifierServiceController>(AlarmsClassifierServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(alarmsClassifierServiceController.getHello()).toBe('Hello World!');
    });
  });
});
