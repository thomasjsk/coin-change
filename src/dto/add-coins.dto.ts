import { IsInt } from 'class-validator';
import { Optional } from '@nestjs/common';

export class AddCoinsDto {
  @IsInt()
  @Optional()
  readonly quarter: number;

  @IsInt()
  @Optional()
  readonly dime: number;

  @IsInt()
  @Optional()
  readonly nickel: number;

  @IsInt()
  @Optional()
  readonly penny: number;
}
