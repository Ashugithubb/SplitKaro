import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth_user')
export class Auth {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column({default:false,type:"boolean"})
    isVerified:boolean
    
    @CreateDateColumn()
    createdAt:Date

    @OneToOne(()=>User)
    user:User
}
