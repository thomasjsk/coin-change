import { Test, TestingModule } from '@nestjs/testing';
import { TillService } from './till.service';
import { Till } from './till';
import { AddCoinsDto } from './dto/add-coins.dto';

describe('TillService', () => {
  let service: TillService;
  let till: Till;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TillService, { provide: Till, useValue: {
        addQuarter: () => null,
        addDime: () => null,
        addNickel: () => null,
        addPenny: () => null,
        }}],
    }).compile();

    service = module.get<TillService>(TillService);
    till = module.get<Till>(Till);
  });

 /*
 I am not writing tests for those simple methods cause it's just an interview not a real life :)
  */

  describe('addCoins', () => {
    it('should add quarters if were provided in payload', () => {
      const addCoinsDto = {
        quarter: 10
      } as AddCoinsDto;
      jest.spyOn(till, 'addQuarter').mockImplementation(() => null);

      service.addCoins(addCoinsDto);

      expect(till.addQuarter).toHaveBeenCalledWith(addCoinsDto.quarter);
    });

    it('should add dimes if were provided in payload', () => {
      const addCoinsDto = {
        dime: 10
      } as AddCoinsDto;
      jest.spyOn(till, 'addDime').mockImplementation(() => null);

      service.addCoins(addCoinsDto);

      expect(till.addDime).toHaveBeenCalledWith(addCoinsDto.dime);
    });

    it('should add nickels if were provided in payload', () => {
      const addCoinsDto = {
        nickel: 10
      } as AddCoinsDto;
      jest.spyOn(till, 'addNickel').mockImplementation(() => null);

      service.addCoins(addCoinsDto);

      expect(till.addNickel).toHaveBeenCalledWith(addCoinsDto.nickel);
    });

    it('should add pennies if were provided in payload', () => {
      const addCoinsDto = {
        penny: 10
      } as AddCoinsDto;
      jest.spyOn(till, 'addPenny').mockImplementation(() => null);

      service.addCoins(addCoinsDto);

      expect(till.addPenny).toHaveBeenCalledWith(addCoinsDto.penny);
    });
  });
});
