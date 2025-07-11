import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./expense.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    category_name:string

    @OneToOne(()=>Expense,(expense)=>expense.category)
    @JoinColumn()
    expense:Expense
}