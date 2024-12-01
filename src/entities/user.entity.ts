import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserRoleEnum } from "../enums/user.enum";



@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column(
        {
            name: 'name',
            length: 50
        }
    )
    name: string;

    @Column({
        unique: true
      })
      email: string;
    
    @Column()
      password: string;
      
    @Column()
      salt:string;//aide à crypter le mdp
    @Column({
        type: 'enum',
        enum :UserRoleEnum,
        default: UserRoleEnum.USER
      }
      )
      role: string;

}