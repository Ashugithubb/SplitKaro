import { Expense } from "src/expense/entities/expense.entity";
import { GroupMember } from "src/group_members/entities/group_member.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    createdBy:string 

    @Column({default:0})
    number_of_members:number

    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(()=>User,(user)=>user.group)
    user:User

    @OneToMany(()=>GroupMember,(group_member)=>group_member.group)
    group_member:GroupMember[]


    @OneToMany(()=>Expense,(expenses)=>expenses.group)
    expenses:Expense[]
    
}
