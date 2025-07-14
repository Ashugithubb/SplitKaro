import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('group_member')
export class GroupMember {
    @PrimaryGeneratedColumn()
    id:number
    
   @ManyToOne(()=>Group,{ onDelete: 'CASCADE' })
   group:Group


 @ManyToOne(() => User, (user) => user.group_members)
  user: User;


}
