import { Quarter } from './models/quarter';
import { Dime } from './models/dime';
import { Nickel } from './models/nickel';
import { Penny } from './models/penny';
import { Injectable } from '@nestjs/common';
import { TILL_STATE } from './initial.state';

export interface Stock {
  quarter: number;
  dime: number;
  nickel: number;
  penny: number;
}

const EMPTY_STOCK: Stock =  {
  quarter: 0,
  dime: 0,
  nickel: 0,
  penny: 0,
};

export class Till {
  private _stock: Stock = {...EMPTY_STOCK};

  constructor(stock: Stock) {
    this.stock = stock;
  }

  set stock(value: Stock) {
    this._stock = value;
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
    return stock.quarter * Quarter + stock.dime * Dime + stock.nickel * Nickel + stock.penny * Penny;
  }

  getChange(demandedChangeInCents): Stock {
    const NOT_ENOUGH_COINS_ERROR_MESSAGE = 'Not enough coins in till!';

    const newStock = {...this.stock};
    const calculatedChange: Stock = {...EMPTY_STOCK};
    let remainingChange = demandedChangeInCents;

    while (remainingChange >= Quarter && newStock.quarter) {
      remainingChange -= Quarter;
      calculatedChange.quarter++;
      newStock.quarter--;
    }
    while (remainingChange >= Dime && newStock.dime) {
      remainingChange -= Dime;
      calculatedChange.dime++;
      newStock.dime--;
    }
    while (remainingChange >= Nickel && newStock.nickel) {
      remainingChange -= Nickel;
      calculatedChange.nickel++;
      newStock.nickel--;
    }
    while (remainingChange > 0 && newStock.penny) {
      remainingChange -= Penny;
      calculatedChange.penny++;
      newStock.penny--;
    }

    const changeInCents = this.total(calculatedChange);

    // console.log('Demands: ', demandedChangeInCents);
    // console.log('Current stock: ', this.stock);
    // console.log('Calculated change: ', calculatedChange);
    // console.log('Found cents: ', changeInCents);
    if (changeInCents !== demandedChangeInCents) {
      throw new Error(NOT_ENOUGH_COINS_ERROR_MESSAGE);
    } else {
      this.stock = newStock;
    }

    return calculatedChange;
  };
}

