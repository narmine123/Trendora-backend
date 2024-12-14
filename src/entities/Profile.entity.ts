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
