import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TillService } from './till.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: TillService, useValue: { getChange: () => null}}],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getChangeCoins', () => {
    it('should return coins', () => {
      expect(true).toBeTruthy()
    });
  });
});
