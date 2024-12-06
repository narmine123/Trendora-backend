import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from 'src/interface/PayloadInterface';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    // Vérifiez si la clé est bien récupérée
    const jwtSecret = configService.get<string>('JWT_SECRET');
    console.log('JWT_SECRET:', jwtSecret); // Ajoutez ce log pour vérifier la clé

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Utilisation de la clé récupérée
    });
  }

  // Méthode de validation du JWT
  async validate(payload: PayloadInterface) {//ajouter user ds objet request
    if (!payload || !payload.name) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.userRepository.findOne({
      where: { name: payload.name },
    });

    if (user) {
      delete user.salt;
      delete user.password;
      return user; 
    } else {
      throw new UnauthorizedException();
    }
  }
}
