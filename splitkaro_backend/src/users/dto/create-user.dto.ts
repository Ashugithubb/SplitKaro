import { IsEmail, IsEnum, IsInt, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export enum UserGender {
      MALE = 'male',
      FEMALE = 'female',
      OTHER = 'other',
    } 

export class CreateUserDto {
    @IsString()
    first_name:string

    @IsString()
    last_name:string

    @IsEmail()
    email:string

    @IsEnum(UserGender, { message: 'Invalid user gender' })
    gender : UserGender

    @IsInt()
    age:number

    @IsPhoneNumber()
    mob:string

    @IsUrl()
    @IsOptional()
    avatar:string

    @IsString()
    @IsOptional()
    bio:string

}
