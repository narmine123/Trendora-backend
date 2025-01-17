import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numerotelephone: number ;

  @Column()
  nationality: string;

  @Column()
  birthdate: Date ;

  @Column()
  age: number ;

  @Column()
  ville: string;

  @Column()
  adresselivraison: string;

 
}

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numerotelephone: number ;

  @Column()
  nationality: string;

  @Column()
  birthdate: Date ;

  @Column()
  age: number ;

  @Column()
  ville: string;

  @Column()
  adresselivraison: string;

  @OneToOne(() => User, user => user.profile)
  user: User;  // Relation un-à-un avec l'utilisateur
}
 

