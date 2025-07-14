import { Module } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { GroupMembersController } from './group_members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_member.entity';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GroupMember,User,Group])],
  controllers: [GroupMembersController,],
  providers: [GroupMembersService],
  exports:[GroupMembersService]
})
export class GroupMembersModule {}
