import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { HasingModule } from './hasing/hasing.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { GroupMembersModule } from './group_members/group_members.module';
import { ExpenseModule } from './expense/expense.module';
import { SettlementsModule } from './settlements/settlements.module';
import { CloudnaryModule } from './cloudnary/cloudnary.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfigAsync } from './config/mailer.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig),
  MailerModule.forRootAsync(mailerConfigAsync),
    AuthModule, HasingModule, UsersModule,
    GroupsModule, GroupMembersModule,
    ExpenseModule, SettlementsModule, CloudnaryModule, MailModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
