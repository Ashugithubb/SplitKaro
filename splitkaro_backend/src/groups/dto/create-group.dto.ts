import { IsInt, IsString } from "class-validator";

export class CreateGroupDto {

    @IsString()
    cretedBy:string

    @IsInt()
    number_of_members:number

}
