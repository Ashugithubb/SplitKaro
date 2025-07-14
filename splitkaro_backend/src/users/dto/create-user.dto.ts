import { IsEmail, IsEnum, IsInt, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";
import { Gender } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    first_name:string

    @IsString()
    last_name:string
    @IsString()
    email:string
    @IsEnum(Gender, { message: 'Invalid user gender' })
    gender : Gender

    @IsInt()
    age:number

    @IsPhoneNumber()
    mob:string

    @IsString()
    @IsOptional()
    avatar:string

    @IsString()
    @IsOptional()
    bio:string

}
