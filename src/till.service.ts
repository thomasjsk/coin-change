import { Injectable } from '@nestjs/common';
import { Stock, Till } from './till';
import { AddCoinsDto } from './dto/add-coins.dto';
import { ReplaceTillStockDto } from './dto/replace-till-stock.dto';

@Injectable()
export class TillService {
  constructor(private till: Till){
  }

  getStock(): Stock {
    return this.till.stock;
  }

  getQuarter(): number {
    return this.till.quarter;
  }

  getDime(): number {
    return this.till.dime;
  }

  getNickel(): number {
    return this.till.nickel;
  }

  getPenny(): number {
    return this.till.penny;
  }

  getChange(cents: number): Stock {
    return this.till.getChange(cents);
  }

  replaceTillStock(newTillStock: ReplaceTillStockDto): void {
    this.till.stock = newTillStock;
  }

  /*
  I prefer to do complex operations in services layer instead of controller layer which
  should be more general, or till (db) which should be more specific. Also i prefer to
  separate all those operations so it's clear what's going on
   */
  addCoins({quarter, dime, nickel, penny} : AddCoinsDto): void {
    if (quarter) {
      this.till.addQuarter(+quarter);
    }

    if (dime) {
      this.till.addDime(+dime);
    }

    if (nickel) {
      this.till.addNickel(+nickel);
    }

    if (penny) {
      this.till.addPenny(+penny);
    }
  }

}
