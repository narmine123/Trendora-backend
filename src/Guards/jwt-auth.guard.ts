import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    // est une garde d'authentification utilisée pour protéger certaines routes dans app NestJS. Elle permet de valider 
    // les tokens JWT et de garantir que seul un utilisateur authentifié puisse accéder aux ressources protégée
    
}