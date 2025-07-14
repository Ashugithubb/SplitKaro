import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../entities/enum/categories';


export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(Category)
  category: Category;

  @IsNumber()
  groupId: number;
}
