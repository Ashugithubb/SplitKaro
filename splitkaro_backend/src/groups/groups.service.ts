import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GroupMembersService } from 'src/group_members/group_members.service';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { In } from 'typeorm';
import { Settlement } from 'src/settlements/entities/settlement.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private readonly groupRepo:Repository<Group>,
               @InjectRepository(GroupMember)
  private groupMemberRepo: Repository<GroupMember>,
              private readonly groupMemberService : GroupMembersService,
            @InjectRepository(Settlement) private readonly settlementRepo:Repository<Settlement>){}
              
  async createGroup(createGroupDto: CreateGroupDto, user: User) {
  const group = this.groupRepo.create({
    ...createGroupDto,
    user: user,                 
    number_of_members: 1       
  });
   await this.groupRepo.save(group);
    await this.groupMemberService.create({
      groupId: group.id,
      userId: user.id
    })
    return  {"msg": "Gr0up created"}
}


async getGroupsOfMember(userId: number) {
  const groupMemberships = await this.groupMemberRepo.find({
    where: { user: { id: userId } },
    relations: ['group', 'group.user', 'group.group_member'],
  });
  return groupMemberships.map((gm) => gm.group);
}


  findAll() {
    return this.groupRepo.find();
  }

  async findOne(id: number) {
  return await this.groupRepo.findOne({
    where: { id },
   relations: ['expenses', 'group_member', 'user']
  });
}
async findAllExpense(groupId: number) {
  const group = await this.groupRepo.findOne({
    where: { id: groupId },
    relations: ['expenses'],
  });
  return group?.expenses || [];
}





  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    return await this.groupRepo.delete({ id });
  }



async userGroupBlance(group_id: number, userId: number) {
  const group = await this.groupRepo.findOne({
    where: { id: group_id },
    relations: ['expenses'],
  });

  if (!group) {
    throw new NotFoundException('Group not found');
  }

  // 1. Get all expense IDs in the group
  const expenseIds = group.expenses.map(exp => exp.id);

  if (expenseIds.length === 0) {
    return {
      totalExpense: 0,
      totalPaid: 0,
      totalPending: 0,
      message: 'No expenses in group',
    };
  }

  
  const userSettlements = await this.settlementRepo.find({
    where: {
      expen: { id: In(expenseIds) },
      user: { id: userId }
    },
    relations: ['expen', 'user']
  });


  const totalExpense = userSettlements.reduce((acc, s) => acc + s.expense, 0);
  const totalPaid = userSettlements.reduce((acc, s) => acc + s.paid, 0);
  const totalPending = userSettlements.reduce((acc, s) => acc + s.pending, 0);

  return {
    totalExpense,
    totalPaid,
    totalPending,
    count: userSettlements.length,
  };
}





}
