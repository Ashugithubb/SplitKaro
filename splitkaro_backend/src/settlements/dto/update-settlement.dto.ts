// dto/update-settlement.dto.ts
import { IsNumber } from 'class-validator';

export class UpdateSettlementDto {
  @IsNumber()
  expense: number;
}
