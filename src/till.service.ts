import { Injectable } from '@nestjs/common';
import { Till } from './till';

@Injectable()
export class TillService {
  constructor(private till: Till){
  }
}
