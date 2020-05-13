import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { TillService } from './till.service';
import { AddCoinsDto } from './dto/add-coins.dto';
import { ReplaceTillStockDto } from './dto/replace-till-stock.dto';

@Controller()
export class AppController {
  constructor(private readonly tillService: TillService) {}

  @Get('stock')
  getStock(
  ) {
    return this.tillService.getStock();
  }

  @Get('quarter')
  getQuarter(
  ) {
    return this.tillService.getQuarter();
  }

  @Get('dime')
  getDime(
  ) {
    return this.tillService.getDime();
  }

  @Get('nickel')
  getNickel(
  ) {
    return this.tillService.getNickel();
  }

  @Get('penny')
  getPenny(
  ) {
    return this.tillService.getPenny();
  }

  @Get('change/:cents')
  getChange(
    @Param('cents', new ParseIntPipe())
    cents: number,
  ) {
    if (cents >= 100) {
      throw new BadRequestException();
    }
    return this.tillService.getChange(cents);
  }

  @Put()
  addCoins(@Body() addCoinsDto: AddCoinsDto) {
    return this.tillService.addCoins(addCoinsDto)
  }

  @Patch()
  replaceTillStock(@Body() replaceTillStockDto: ReplaceTillStockDto) {
    return this.tillService.replaceTillStock(replaceTillStockDto)
  }
}
