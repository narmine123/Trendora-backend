import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Profile } from './entities/profile.entity';

import { Cart } from './cart/entities/cart.entity';


dotenv.config();  // Charger les variables d'environnement à partir du fichier .env


@Module({
    imports: [TypeOrmModule.forFeature([User, Profile,Cart]),
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions:{
        expiresIn: 3600 
      }
    })
      
    
],
  providers: [UserService],  
  controllers: [UserController

  ]
})
export class UserModule {}
