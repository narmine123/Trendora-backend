import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import * as dotenv from 'dotenv';
import { UserService } from './user.service';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './entities/profile.entity';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';

// Charger les variables d'environnement depuis .env
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Cela vous aidera à vérifier si la variable est bien chargée

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre le module global
      envFilePath: '.env', // Charger les variables depuis .env
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'authentification',
      entities: [User, Profile],
      autoLoadEntities: true,
      driver: require('mysql2'),
      synchronize: true,
      //dropSchema: true, // Supprime les tables avant de recréer le schéma
    }),
    TypeOrmModule.forFeature([User, Profile]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Utilisez la clé secrète depuis les variables d'environnement
      signOptions: { expiresIn: 3600 }, // Option d'expiration
    }),
    UserModule,
    CartModule,
    CartItemsModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AppModule {}
