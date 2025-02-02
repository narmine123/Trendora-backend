import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDTO } from './dto/LoginCredentialsDTO';
import { JwtService } from '@nestjs/jwt';
import { Profile } from './entities/profile.entity';
import { ProfileDto } from './dto/ProfileDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>, 
    private jwtService: JwtService
  ) {}

  async register(userData: UserSubscribeDto): Promise<Partial<User>> {

          // Check if the email already exists
          const existingUser = await this.userRepository.findOneBy({ email: userData.email });
          if (existingUser) {
            throw new ConflictException('This email is already in use.');
          }

          // Create a new user entity
          const user = this.userRepository.create(userData);
    
          // Generate a salt and hash the password(salt qui aide à crypter mdp)
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(userData.password, salt);
          user.salt = salt;

          try {
            // Save the user to the database
            await this.userRepository.save(user);
          } catch (e) {
            console.error('Error saving user:', e);
            throw new ConflictException('Could not register the user. Please try again.');
          }

          // Return only the safe user data(without password or salt)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,

          };
  }

  async login (credentials : LoginCredentialsDTO){
        //récupérer le login et mdp
        const {email, password} = credentials;
        //on peut se loger ou via le username ou le password
        //verifier est ce qu'il ya un user avec ce login ou ce mdp
        const user = await this.userRepository.createQueryBuilder("user")
      .where("user.email = :email or user.password = :password", { email, password })
      .getOne();
        //pour récupérer one entité
        //si not user je déclenche une erreur
        console.log(user);
        if (!user){
          throw new NotFoundException('username ou password erronée')
        }
        //si oui je verifie est ce que le mdp est correct ou pas
        const hashedPassword = await  bcrypt.hash(password, user.salt);
        if (hashedPassword === user.password) {

          const payload = {
            name: user.name,
            email:user.email,
            role:user.role
          }
          /*construire token avec sign*/
          const jwt = this.jwtService.sign(payload)
          
          
          return  {
            "access_token" : jwt
          } ;

        } else {
          //si mdp incorrecte je déclenche une erreur
          throw new NotFoundException('username ou password erronée')

        }
      }

        async addProfile(profileDto :ProfileDto ) : Promise<Profile> {
          console.log('DTO réçu :', profileDto);
          const newUser = this.profileRepository.create(profileDto);
          console.log('User crée : ' , newUser);
          return await this.profileRepository.save(newUser);
       }
       

       async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
      }

      async updatePassword(Id: string, hashedPassword: string): Promise<void> {
        await this.userRepository.update(Id, { password: hashedPassword });
      }
      

      async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
          where: { email: email },
        });
    
        if (!user) {
          throw new NotFoundException('Utilisateur non trouvé');
        }
    
        return user;
      }

    


async getUserWithProfile(id: number): Promise<User> {
  const user = await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.profile', 'profile')
    .where('user.id = :id', { id })
    .getOne();

  if (!user) {
    throw new Error('User not found');
  }

  return user; // Le profil sera inclus si la relation est correctement configurée
}


async getProfileById(profileId: number): Promise<Profile> {
  const profile = await this.profileRepository.findOne({
    where: { id: profileId },
  });

  if (!profile) {
    throw new Error(`Profile avec l'id ${profileId} n'existe pas`);
  }

  return profile;
}





  


  
  
  
  
  
  } 