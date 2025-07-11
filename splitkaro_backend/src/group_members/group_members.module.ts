import { Module } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { GroupMembersController } from './group_members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_member.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GroupMember])],
  controllers: [GroupMembersController,],
  providers: [GroupMembersService],
})
export class GroupMembersModule {}
