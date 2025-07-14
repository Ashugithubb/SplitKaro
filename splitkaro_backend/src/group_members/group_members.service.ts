import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group_member.dto';
import { UpdateGroupMemberDto } from './dto/update-group_member.dto';
import { GroupMember } from './entities/group_member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';



@Injectable()
export class GroupMembersService {
constructor(
  @InjectRepository(GroupMember)
  private groupMemberRepo: Repository<GroupMember>,

  @InjectRepository(Group)
  private groupRepo: Repository<Group>,

  @InjectRepository(User)
  private userRepo: Repository<User>,
) {}

  async create(createGroupMemberDto: CreateGroupMemberDto): Promise<GroupMember> {
  const { groupId, userId } = createGroupMemberDto;

 
  const group = await this.groupRepo.findOneBy({ id: groupId });
  if (!group) throw new NotFoundException('Group not found');

  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new NotFoundException('User not found');

  const newGroupMember = this.groupMemberRepo.create({
    group,
    user,
  });
 
 
  const saved = await this.groupMemberRepo.save(newGroupMember);

  
  group.number_of_members += 1;
 
  return saved;
}


  findAll() {
    return `This action returns all groupMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMember`;
  }

  update(id: number, updateGroupMemberDto: UpdateGroupMemberDto) {
    return `This action updates a #${id} groupMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMember`;
  }
}
