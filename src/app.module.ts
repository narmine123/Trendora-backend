import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'authentification',
      entities: [User],
      synchronize: true ,//cad chaque modifié appliqué sera ajouté au bd
      autoLoadEntities: true,
      logging: true,
      driver: require('mysql2'), // Specify mysql2

      //dropSchema: true, // Supprime les tables avant de recréer le schéma

    }),
    TypeOrmModule.forFeature([User]),
     JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn: '1d'}
     }),
     UserModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
