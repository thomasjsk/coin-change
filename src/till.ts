import { QUARTER } from './const/QUARTER';
import { DIME } from './const/DIME';
import { NICKEL } from './const/NICKEL';
import { PENNY } from './const/PENNY';
import { BadRequestException } from '@nestjs/common';

export interface Stock {
  quarter: number;
  dime: number;
  nickel: number;
  penny: number;
}

const EMPTY_STOCK: Stock = {
  quarter: 0,
  dime: 0,
  nickel: 0,
  penny: 0,
};

const FULL_STOCK: Stock = {
  quarter: 4,
  dime: 10,
  nickel: 20,
  penny: 100,
};

export class Till {
  private _stock: Stock = { ...EMPTY_STOCK };

  constructor(stock?: Stock) {
    if (stock) {
      this.stock = stock;
    }
  }

  set stock(value: Stock) {
    this._stock = {
      quarter: +value.quarter || 0,
      dime: +value.dime || 0,
      nickel: +value.nickel || 0,
      penny: +value.penny || 0,
    };
  }

  get stock() {
    return this._stock;
  }

  // I prefer to have explicit methods to add different entities than having one generic
  addQuarter(newQuarter: number): void {
    this.stock.quarter += newQuarter;
  }

  get quarter() {
    return this.stock.quarter || 0;
  }

  addDime(newDime: number): void {
    this.stock.dime += newDime;
  }

  get dime() {
    return this.stock.dime || 0;
  }

  addNickel(newNickel: number): void {
    this.stock.nickel += newNickel;
  }

  get nickel() {
    return this.stock.nickel || 0;
  }

  addPenny(newPenny: number): void {
    this.stock.penny += newPenny;
  }

  get penny() {
    return this.stock.penny || 0;
  }

  total(stock: Stock) {
    return stock.quarter * QUARTER + stock.dime * DIME + stock.nickel * NICKEL + stock.penny * PENNY;
  }

  getChange(demandedChangeInCents: number): Stock {
    const { change, newStock } = this.calculateChange(demandedChangeInCents, this.stock);

    const changeInCents = this.total(change);

    if (changeInCents !== demandedChangeInCents) {
      const { quarter, dime, nickel, penny } = this.getMinimumNeededChange(demandedChangeInCents, change);

      const moreQuarter = quarter ? `${quarter} quarter` : null;
      const moreDime = dime ? `${dime} dime` : null;
      const moreNickel = nickel ? `${nickel} nickel` : null;
      const morePenny = penny ? `${penny} penny` : null;

      const missingCoins = [moreQuarter, moreDime, moreNickel, morePenny].filter(message => Boolean(message)).join(', ');

      throw new BadRequestException(`Not enough coins in till! You need more: ${missingCoins}`);
    } else {
      this.stock = newStock;
    }

    return change;
  };

  getMinimumNeededChange(demandedChangeInCents: number, tempChange: Stock) {
    const { change } = this.calculateChange(demandedChangeInCents, { ...FULL_STOCK });

    return {
      quarter: Math.max(0, change.quarter - tempChange.quarter),
      dime: Math.max(0, change.dime - tempChange.dime),
      nickel: Math.max(0, change.nickel - tempChange.nickel),
      penny: Math.max(0, change.penny - tempChange.penny),
    };
  }

  private calculateChange(demandedChangeInCents: number, stock: Stock): {
    change: Stock, newStock: Stock
  } {
    const change: Stock = { ...EMPTY_STOCK };
    const newStock = { ...stock };
    let remainingChange = demandedChangeInCents;

    while (remainingChange >= QUARTER && newStock.quarter) {
      remainingChange -= QUARTER;
      change.quarter++;
      newStock.quarter--;
    }
    while (remainingChange >= DIME && newStock.dime) {
      remainingChange -= DIME;
      change.dime++;
      newStock.dime--;
    }
    while (remainingChange >= NICKEL && newStock.nickel) {
      remainingChange -= NICKEL;
      change.nickel++;
      newStock.nickel--;
    }
    while (remainingChange > 0 && newStock.penny) {
      remainingChange -= PENNY;
      change.penny++;
      newStock.penny--;
    }

    return { change, newStock };
  }
}

