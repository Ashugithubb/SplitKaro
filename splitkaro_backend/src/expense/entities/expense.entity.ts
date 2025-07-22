import { Group } from "src/groups/entities/group.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Settlement } from "src/settlements/entities/settlement.entity";
import { Category } from "./enum/categories";



@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Group, (group) => group.expenses)
  group: Group;

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.OTHER,  
  })
  category: Category;
  // @Column()
  // createdBy:number

  @OneToMany(() => Settlement, (s) => s.expen,)
  settlement: Settlement[];
}
