import { Body, Controller, Get, Inject, Post, UseGuards, Request, NotFoundException, Param  } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginCredentialsDTO } from './dto/LoginCredentialsDTO';
import { ProfileDto } from './dto/ProfileDto';
import { Profile } from './entities/profile.entity';
import * as crypto from 'crypto';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    @Post('register')
    register(@Body() userData: UserSubscribeDto): Promise<Partial<User>>
    {
        return this.userService.register(userData);
    }

    @Post('login')
    login(@Body() Credentials : LoginCredentialsDTO)
    {
        return this.userService.login(Credentials);
    }

    @Post('save')
    async addProfile(@Body() profiledto:ProfileDto):Promise<Profile>{
        return await this.userService.addProfile(profiledto);
    }
    
    @Post('recover-password')
        async recoverPassword(@Body() body: { email: string }) {
        const user = await this.userService.findByEmail(body.email);

        if (!user) {
            throw new NotFoundException('Utilisateur introuvable');
        }

        // Générer un mot de passe temporaire
        const tempPassword = crypto.randomBytes(6).toString('hex'); // Exemple : 12 caractères aléatoires
        
        // Enregistrer le mot de passe temporaire dans la base de données (hashé)
        const hashedTempPassword = await this.userService.hashPassword(tempPassword);
        await this.userService.updatePassword(user.id.toString(), hashedTempPassword);

        // Retourner ou envoyer le mot de passe temporaire
        return { message: 'Mot de passe temporaire généré.', tempPassword };
        }

        @Get(':id')
        async getUser(@Param('id') id: number): Promise<any> {
          try {
            const user = await this.userService.getUserWithProfile(id);
            if (!user) {
              throw new Error('User not found');
            }
            
            const profile = await this.userService.getProfileById(id);
            return { user, profile };  // Retourner l'utilisateur et son profil ensemble
          } catch (error) {
            return { error: error.message };
          }
        }
        
}
/*
@Get('/profile/:id')
  async getProfile(@Param('id') id: number) {
    return this.userService.getProfileById(id);
  }

 */
 
  



  















/*
    @UseGuards(JwtAuthGuard)// Utilise le guard JwtAuthGuard pour vérifier le JWT
    @Get()// Route pour récupérer les infos de l'utilisateur
    async getProfile(@Request() req) {
      // L'utilisateur est déjà dans req.user grâce à JwtAuthGuard
      const user = req.user;
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

*/


          








        





