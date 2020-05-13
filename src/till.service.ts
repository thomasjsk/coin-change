import { Injectable } from '@nestjs/common';
import { Stock, Till } from './till';
import { TILL_STATE } from './initial.state';

@Injectable()
export class TillService {
  private till: Till;
  constructor(){
    this.till = new Till(TILL_STATE)
  }

  getChange(cents: number): Stock {
    return this.till.getChange(cents);
  }
}
