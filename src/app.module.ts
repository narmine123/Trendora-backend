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
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { ProductsModule} from './product/products.module';
import { Cart } from './cart/entities/cart.entity';
import { CartModule } from './cart/cart.module';

import { CartItem } from './cart-item/entities/cart-item.entity';
import { Product } from './product/product.entity';
import { CartItemModule } from './cart-item/cart-item.module';

import { Review } from './reviews/review.entity';
import { OrderModule } from './order/order.module';
import { ReviewsModule } from './reviews/reviews.module';

import { Order } from './order/order.entity';

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
      entities: [User, Profile,Product,Cart,CartItem, Review, Order],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      driver: require('mysql2'),
    }),
    TypeOrmModule.forFeature([User, Profile,Product,Cart,CartItem , Review, Order]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Utilisez la clé secrète depuis les variables d'environnement
      signOptions: { expiresIn: 3600 }, // Option d'expiration
    }),
    UserModule,
    ProductsModule,
    CartModule,

    OrderModule,
    CartItemModule,
    ReviewsModule,

  ],
  controllers: [UserController, OrderController],
  providers: [UserService, JwtStrategy, OrderService ],

  exports: [JwtStrategy , TypeOrmModule],
})
export class AppModule {}
