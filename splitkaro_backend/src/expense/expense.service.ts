import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { User } from 'src/users/entities/user.entity';
import { Settlement } from 'src/settlements/entities/settlement.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>,

    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    @InjectRepository(Settlement) private readonly settlementRepo:Repository<Settlement>,
    private readonly mailService: MailService
  ) { }

  // async create(createExpenseDto: CreateExpenseDto, userId: number): Promise<Expense> {
  //   const { description, amount, category, groupId } = createExpenseDto;

  //   const group = await this.groupRepo.findOne({
  //     where: { id: groupId },
  //   });

  //   if (!group) {
  //     throw new NotFoundException('Group not found');
  //   }

  //   const newExpense = this.expenseRepo.create({
  //     description,
  //     amount,
  //     category,
  //     group,
  //   });


  //   return await this.expenseRepo.save(newExpense);
  // }


// async createExpense(dto: CreateExpenseDto, user: User) {
//   const group = await this.groupRepo.findOne({
//     where: { id: dto.groupId },
//     relations: ['group_member', 'group_member.user'],
//   });

//   if (!group) throw new NotFoundException('Group not found');

//   const expense = this.expenseRepo.create({
//     description: dto.description,
//     amount: dto.amount,
//     group: group,
//     category: dto.category,
//   });

//   await this.expenseRepo.save(expense);

 
//   const members = group.group_member;
//   const numMembers = members.length;
//   const splitAmount = Math.floor(dto.amount / numMembers);
//   const Total = dto.amount;
//   const balance =Total-splitAmount

//   const settlements = members.map((member) =>
//     this.settlementRepo.create({
//       expen: expense,
//       user: member.user,
//       expense: splitAmount, 
//       paid: member.user.id === user.id ? Total : 0,
//       pending: member.user.id === user.id ? balance : (0-splitAmount),
//       paymentDate: new Date(),
//     }),
//   );

//   await this.settlementRepo.save(settlements);

//   return { message: 'Expense and settlements added', expense, settlements };
// }
async createExpense(dto: CreateExpenseDto, user: User) {
  const group = await this.groupRepo.findOne({
    where: { id: dto.groupId },
    relations: ['group_member', 'group_member.user'],
  });

  if (!group) throw new NotFoundException('Group not found');

  const expense = this.expenseRepo.create({
    description: dto.description,
    amount: dto.amount,
    group: group,
    category: dto.category,
  });

  await this.expenseRepo.save(expense);

  const members = group.group_member;
  const numMembers = members.length;
  const splitAmount = Math.floor(dto.amount / numMembers);
  const total = dto.amount;
  const balance = total - splitAmount;

  const settlements = members.map((member) =>
    this.settlementRepo.create({
      expen: expense,
      user: member.user,
      expense: splitAmount,
      paid: member.user.id === user.id ? total : 0,
      pending: member.user.id === user.id ? balance : 0 - splitAmount,
      paymentDate: new Date(),
    }),
  );

  await this.settlementRepo.save(settlements);
  for (const member of members) {
    const email = member.user.email;
    if (email) {
      await this.mailService.sendExpenseAddedEmail(email, {
        description: expense.description,
        amount: expense.amount
      });
      console.log(email);
    }
  }

  return { message: 'Expense and settlements added', expense, settlements };
}


   async getSettlementsDetails(expensId:number){
      const expend = await this.expenseRepo.findOne({
        where: { id: expensId },
       relations: ['settlement', 'settlement.user']
      })
    return  expend;
   }




    async getExpensesGroupedByCategory() {
    return await this.expenseRepo
      .createQueryBuilder('expense')
      .select('expense.category', 'category')
      .addSelect('SUM(expense.amount)', 'totalAmount')
      .groupBy('expense.category')
      .getRawMany();
  }

 
 



  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async remove(id: number) {
    return await this.expenseRepo.delete({id});
  }
}
