import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
// @Post()
// @UseGuards(JwtAuthGuard)
// create(@Body() dto: CreateExpenseDto, @Req() req) {
//   return this.expenseService.create(dto, req.user.id);
// }
@Post('create')
  @UseGuards(JwtAuthGuard)
  async createExpense(@Body() dto: CreateExpenseDto, @Req() req) {
    const user = req.user; // from JwtAuthGuard
    return await this.expenseService.createExpense(dto, user);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }


  @Get('settlement/:id')
  getSettlementsDetails(@Param('id') id: string){
    return this.expenseService.getSettlementsDetails(+id) ; 
  }
}
