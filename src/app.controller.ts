import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TillService } from './till.service';

@Controller()
export class AppController {
  constructor(private readonly tillService: TillService) {}

  @Get(':cents')
  getChange(
    @Param('cents', new ParseIntPipe())
    cents: number,
  ) {
    return this.tillService.getChange(cents);
  }
}
