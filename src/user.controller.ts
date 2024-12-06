import { Body, Controller, Get, Inject, Post, UseGuards, Request  } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginCredentialsDTO } from './dto/LoginCredentialsDTO';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express'; // Importer le type Request d'Express


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    @Post()
    register(
        @Body() userData: UserSubscribeDto
    ): Promise<Partial<User>>
    {
        return this.userService.register(userData);
    }

    @Post('login')
    login(
        @Body() Credentials : LoginCredentialsDTO
    )
    {
        return this.userService.login(Credentials);
    }
    @Get('profile') // Route pour récupérer les infos de l'utilisateur
    @UseGuards(JwtAuthGuard) // Utilise le guard JwtAuthGuard pour vérifier le JWT
    getProfile(@Request() req): User { // Récupère l'utilisateur authentifié
      return req.user; // Le user est attaché à req.user après validation du JWT
    }


}