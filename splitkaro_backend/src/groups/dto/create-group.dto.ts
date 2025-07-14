import { IsInt, IsString } from "class-validator";


export class CreateGroupDto {

    @IsString()
    group_name:string

}
