import { IsInt,  } from 'class-validator';

export class ReplaceTillStockDto {
  @IsInt()
  readonly quarter: number;

  @IsInt()
  readonly dime: number;

  @IsInt()
  readonly nickel: number;

  @IsInt()
  readonly penny: number;
}
