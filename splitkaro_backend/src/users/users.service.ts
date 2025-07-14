import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CloudnaryService } from 'src/cloudnary/cloudnary.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
                private readonly cloudService: CloudnaryService ) { }
              
  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.save(createUserDto);
  }

  async update(userId: number, updateUserDto: Partial<CreateUserDto>) {
    console.log(userId);
    await this.userRepo.update(userId, updateUserDto);
    return this.userRepo.findOne({ where: { id: userId } });
  }



  async findOne(id: number) {
    return await this.userRepo.findOneBy({id});
  }


  findAll() {
    return `This action returns all users`;
  }

  
  async remove(id: number) {
    const result = await this.userRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} has been removed.` };
  }


   uplodImage(file: Express.Multer.File) {
    return this.cloudService.uploadFileFromPath(file.path);
  }

  async searchUsers(query: string): Promise<User[]> {
    if (!query) return [];

    return this.userRepo.find({
      where: [
        { first_name: ILike(`%${query}%`) },
        { last_name: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
      select: ['id', 'first_name', 'last_name', 'email', 'avatar'], 
      take: 10, 
    });
  }


}
