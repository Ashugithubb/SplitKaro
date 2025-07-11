import { Expense } from "src/expense/entities/expense.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Settlement {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    expense:number

    @Column()
    paid:number

    @Column()
    pending:number

    @Column()
    paymentDate:Date

    @ManyToOne(()=>Expense,(e)=>e.settlement)
    expen:Expense

    @OneToOne(()=>User)
    @JoinColumn()
    user:User


}
