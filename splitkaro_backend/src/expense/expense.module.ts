import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

import { Expense } from './entities/expense.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Settlement } from 'src/settlements/entities/settlement.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Expense,Group,Settlement])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
