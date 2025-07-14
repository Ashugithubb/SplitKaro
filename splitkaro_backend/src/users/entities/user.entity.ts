import { UpdateAuthDto } from "src/auth/dto/update-auth.dto";
import { Auth } from "src/auth/entities/auth.entity";
import { GroupMember } from "src/group_members/entities/group_member.entity";
import { Group } from "src/groups/entities/group.entity";
import { Settlement } from "src/settlements/entities/settlement.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    bio: string

    @Column()
    first_name: string

    @Column()
    last_name: string
    @Column()
    age: number

    @Column()
    email:string
    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column({default:""})
    mob:string 

    @Column({ nullable: true })
    avatar: string

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Auth)
    auth: Auth

    @OneToMany(() => Group, (group) => group.user)
    group: Group[]

    // @OneToOne(() => GroupMember)
    // group_memebr: GroupMember
    @OneToMany(() => GroupMember, (gm) => gm.user)
    group_members: GroupMember[]; 

    @OneToMany(()=>Settlement,(s)=>s.user)
    settlement:Settlement[]

}
