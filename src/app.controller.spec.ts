import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TillService } from './till.service';
import { Stock } from './till';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let controller: AppController;
  let tillService: TillService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: TillService, useValue: {
          getStock: () => null, getQuarter: () => null, getChange: () => null
        },
      }],
    }).compile();

    controller = app.get<AppController>(AppController);
    tillService = app.get<TillService>(TillService);
  });

  describe('getStock', () => {
    it('should return stock state', () => {
      const stock = {} as Stock;
      jest.spyOn(tillService, 'getStock').mockReturnValue(stock);

      const result = controller.getStock();

      expect(result).toEqual(stock);
      expect(tillService.getStock).toHaveBeenCalledWith();
    });
  });

  describe('getQuarter', () => {
    it('should return amount of quarter coins', () => {
      const amountOfQuarters = 123;
      jest.spyOn(tillService, 'getQuarter').mockReturnValue(amountOfQuarters);

      const result = controller.getQuarter();

      expect(result).toEqual(amountOfQuarters);
      expect(tillService.getQuarter).toHaveBeenCalledWith();
    });
  });

  describe('getChange', () => {
    it('should return change', () => {
      const cents = 50;
      const change: Stock = {
        quarter: 2,
        dime: 0,
        nickel: 0,
        penny: 0,
      };
      jest.spyOn(tillService, 'getChange').mockReturnValue(change);

      const result = controller.getChange(cents);

      expect(result).toEqual(change);
      expect(tillService.getChange).toHaveBeenCalledWith(cents);
    });

    it('should throw bad request exception for > $1', () => {
      const cents = 100;
      jest.spyOn(tillService, 'getChange').mockReturnValue(null);

      let result;
      try {
        result = controller.getChange(cents);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
      }

      expect(result).toBeUndefined();
      expect(tillService.getChange).not.toHaveBeenCalled();
    });
  });

  /*
  There is no point in testing the rest of those methods. I would've test them
  in the same way as I ded above. They simply just return a value from service so that's
  the only think I have to test on this layer. If there were some other conditions to consider in
  controller (different return data format etc.) it would be tested here
   */


});
