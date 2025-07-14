import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, Put, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  findOne(@Req() req) {
    const userId = req.user.id;
    return this.usersService.findOne(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Req() req, @Body() dto: Partial<CreateUserDto>) {
    const userId = req.user.id;
    return this.usersService.update(userId, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, `${file.fieldname}-${uniqueSuffix}-${extname(file.originalname)}`)
      }
    })
  }))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    fileIsRequired: true,
    validators: [new MaxFileSizeValidator({ maxSize: 1000000 }),]
  })) file: Express.Multer.File) {
    return this.usersService.uplodImage(file);
  }


  @Get('search')
async searchUsers(@Query('query') query: string) {
  return this.usersService.searchUsers(query);
}



}
