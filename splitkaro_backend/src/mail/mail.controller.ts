import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import Maildto from './dto/mail.dto';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService:MailService){}
    @Post()
    async sendMial(@Body() dto:Maildto){
        return this.mailService.sendMail(dto);
    }
}