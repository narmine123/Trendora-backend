import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    // est une garde d'authentification utilisée pour protéger certaines routes dans app NestJS. Elle permet de valider 
    // les tokens JWT et de garantir que seul un utilisateur authentifié puisse accéder aux ressources protégée
    
}

import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
// est une garde d'authentification utilisée pour protéger certaines routes dans app NestJS. Elle permet de valider 
    // les tokens JWT et de garantir que seul un utilisateur authentifié puisse accéder aux ressources protégée
    
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];  // Récupère le token du header Authorization

    if (!token) {
      return false;
    }

    try {
      // Vérifie et décode le token
      const decoded = this.jwtService.verify(token);
      request.user = decoded;  // Attache l'utilisateur décodé à la requête
      return true;
    } catch (error) {
      return false;
    }
  }
}
