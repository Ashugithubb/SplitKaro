
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth } from 'src/auth/entities/auth.entity';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { Settlement } from 'src/settlements/entities/settlement.entity';



export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<string>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities:[Auth,User,Group,GroupMember,Expense,Settlement],
    synchronize: true,
    // migrations: ['dist/migrations/**/*.js'],
  }),
};
