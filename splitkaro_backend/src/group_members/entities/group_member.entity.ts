import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GroupMember {
    @PrimaryGeneratedColumn()
    id:number
    
   @ManyToOne(()=>Group)
   group:Group

   @OneToOne(()=>User)
   @JoinColumn()
   user:User

}
