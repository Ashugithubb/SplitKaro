import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { SettlementsService } from './settlements.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { UpdateSettlementDto } from './dto/update-settlement.dto';

@Controller('settlements')
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  @Post()
  create(@Body() createSettlementDto: CreateSettlementDto) {
    return this.settlementsService.create(createSettlementDto);
  }

  @Get()
  findAll() {
    return this.settlementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settlementsService.findOne(+id);
  }

  @Put('update/:id')
async updateSettlement(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateSettlementDto,
) {
  return this.settlementsService.updateSettlement(id, dto);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settlementsService.remove(+id);
  }
}
