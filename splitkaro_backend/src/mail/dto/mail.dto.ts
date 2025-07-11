import { IsEmail, IsInt, IsString } from "class-validator";

export default class Maildto{
    @IsString()
    otp:string

    @IsEmail()
    email:string
}