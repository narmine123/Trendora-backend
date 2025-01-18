import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserRoleEnum } from 'src/enums/user.enum';
import { Profile } from './profile.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string; // aide à crypter le mot de passe

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile; // Relation un-à-un avec le profil

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart;
}
