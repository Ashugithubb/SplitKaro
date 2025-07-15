import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { UpdateSettlementDto } from './dto/update-settlement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Settlement } from './entities/settlement.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class SettlementsService {
  constructor( @InjectRepository(Settlement) private readonly settlementRepo:Repository<Settlement>,
                private readonly mailService: MailService){}
  
// async updateSettlement(settlementId: number, dto: UpdateSettlementDto) {
//   const target = await this.settlementRepo.findOne({
//     where: { id: settlementId },
//     relations: ['expen'],
//   });
  
// const oldExpense =  target.expense;
//   if (!target) throw new NotFoundException('Settlement not found');

//   const expenseId = target.expen.id;

//   // Fetch all settlements linked to this expense
//   const allSettlements = await this.settlementRepo.find({
//     where: { expen: { id: expenseId } },
//     relations: ['user'],
//   });

//   const totalUsers = allSettlements.length;
//   const otherUsersCount = totalUsers - 1;
//     console.log(otherUsersCount)
//   if (otherUsersCount <= 0) throw new BadRequestException('No other members to split');

//   const splitExpense = Math.floor(Math.abs(dto.expense-oldExpense) / otherUsersCount); // equal part
//   const updatedAt = new Date();
//    console.log(splitExpense)
//   const updatedSettlements = allSettlements.map((s) => {

//     if (s.id === settlementId) {
//       s.expense = dto.expense;
//     } else {
//       if(oldExpense>dto.expense){
//       s.expense+=splitExpense;}
//       else{
//         s.expense-=splitExpense;
//       }
//     }

   
//     s.pending = s.paid - s.expense;
//     s.paymentDate = updatedAt;

//     return s;
//   });

//   await this.settlementRepo.save(updatedSettlements);

//   return {
//     message: 'All settlements updated with new expense distribution.',
//     updated: updatedSettlements,
//   };

// }
async updateSettlement(settlementId: number, dto: UpdateSettlementDto) {
  const target = await this.settlementRepo.findOne({
    where: { id: settlementId },
    relations: ['expen'],
  });

  const oldExpense = target.expense;
  if (!target) throw new NotFoundException('Settlement not found');

  const expenseId = target.expen.id;

  const allSettlements = await this.settlementRepo.find({
    where: { expen: { id: expenseId } },
    relations: ['user'],
  });

  const totalUsers = allSettlements.length;
  const otherUsersCount = totalUsers - 1;
  if (otherUsersCount <= 0) throw new BadRequestException('No other members to split');

  const splitExpense = Math.floor(Math.abs(dto.expense - oldExpense) / otherUsersCount);
  const updatedAt = new Date();

  const updatedSettlements = allSettlements.map((s) => {
    if (s.id === settlementId) {
      s.expense = dto.expense;
    } else {
      if (oldExpense > dto.expense) {
        s.expense += splitExpense;
      } else {
        s.expense -= splitExpense;
      }
    }

    s.pending = s.paid - s.expense;
    s.paymentDate = updatedAt;
    return s;
  });

  await this.settlementRepo.save(updatedSettlements);

  // ✅ Send notification emails to users
  const exp = target.expen;
  for (const s of updatedSettlements) {
    const email = s.user.email;
    if (email) {
      await this.mailService.sendExpenseUpdatedEmail(email, {
        description: exp.description,
        amount: s.expense,
      });
    }
  }

  return {
    message: 'All settlements updated with new expense distribution.',
    updated: updatedSettlements,
  };
}


create(createSettlementDto: CreateSettlementDto
  ) {
    return 'This action adds a new settlement';
  }

  findAll() {
    return `This action returns all settlements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} settlement`;
  }
  remove(id: number) {
    return `This action removes a #${id} settlement`;
  }
}
