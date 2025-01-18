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
import { ProductsModule} from './product/products.module';
import { Cart } from './cart/entities/cart.entity';
import { CartModule } from './cart/cart.module';

import { CartItem } from './cart-item/entities/cart-item.entity';
import { Product } from './product/product.entity';


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
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Profile, ],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      driver: require('mysql2'),
    }),
    TypeOrmModule.forFeature([User, Profile,Product,Cart,CartItem]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Utilisez la clé secrète depuis les variables d'environnement
      signOptions: { expiresIn: 3600 }, // Option d'expiration
    }),
    UserModule,
    ProductsModule,
    CartModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AppModule {}
