import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GroupMembersService } from 'src/group_members/group_members.service';
import { GroupMember } from 'src/group_members/entities/group_member.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private readonly groupRepo:Repository<Group>,
               @InjectRepository(GroupMember)
  private groupMemberRepo: Repository<GroupMember>,
              private readonly groupMemberService : GroupMembersService){}
              
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
}
