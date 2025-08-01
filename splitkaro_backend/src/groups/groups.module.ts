import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMembersModule } from 'src/group_members/group_members.module';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Settlement } from 'src/settlements/entities/settlement.entity';

@Module({imports:[TypeOrmModule.forFeature([Group,GroupMember,Settlement]),GroupMembersModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
