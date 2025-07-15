import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth';

@Controller('group')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('create')
@UseGuards(JwtAuthGuard)
createGroup(@Body() dto: CreateGroupDto, @Req() req) {
  return this.groupsService.createGroup(dto, req.user);
}



@UseGuards(JwtAuthGuard)
@Get('my-groups')
async getGroupsWhereUserIsMember(@Req() req) {
  const userId = req.user.id;
  return this.groupsService.getGroupsOfMember(userId);
}

@Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }
  @Get('expenses/:id')
   findAllExpense(@Param('id') id: string){
    return this.groupsService.findAllExpense(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('balance/:groupId')
  async getUserGroupBalance(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req
  ) {
    const userId = req.user.id; 
    return this.groupsService.userGroupBlance(groupId, userId);
  }



  @Get('members/:groupId')
getMembers(@Param('groupId') groupId: number) {
  return this.groupsService.getGroupMembers(groupId);
}

}
