import { Group } from "src/groups/entities/group.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Settlement } from "src/settlements/entities/settlement.entity";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    description:string

    @Column()
    amount:number

    @CreateDateColumn()
    createdAt:Date

    @ManyToOne(()=>Group,(group)=>group.expenses)
    group:Group
    
    @OneToOne(()=>Category,(category)=>category.expense)
    category:Category

    @OneToMany(()=>Settlement,(s)=>s.expen)
    settlement: Settlement[]
}
