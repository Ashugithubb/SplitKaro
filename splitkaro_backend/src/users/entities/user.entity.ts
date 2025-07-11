import { UpdateAuthDto } from "src/auth/dto/update-auth.dto";
import { Auth } from "src/auth/entities/auth.entity";
import { GroupMember } from "src/group_members/entities/group_member.entity";
import { Group } from "src/groups/entities/group.entity";
import { Settlement } from "src/settlements/entities/settlement.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    bio:string

    @Column()
    first_name:string

    @Column()
    last_name:string

    @Column()
    email:string

    @Column()
    age:number
    
    @Column('enum')
    gender: 'male' | 'female' | 'other'

    @Column({nullable:true})
    avtar:string

    @UpdateDateColumn()
    updatedAt:Date

    @OneToOne(()=>Auth)
    @JoinColumn()
    auth : Auth

    @OneToMany(()=>Group,(group)=>group.user)
    group:Group[]

    @OneToOne(()=>GroupMember)
    group_memebr:GroupMember
   
    @OneToOne(()=>Settlement)
    slttlement:Settlement

}
