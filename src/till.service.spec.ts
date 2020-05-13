import { Test, TestingModule } from '@nestjs/testing';
import { TillService } from './till.service';
import { Till } from './till';

describe('TillService', () => {
  let service: TillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TillService, { provide: Till, useValue: {}}],
    }).compile();

    service = module.get<TillService>(TillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
