import * as dotenv from 'dotenv';
dotenv.config();  // Charger les variables d'environnement avant tout autre code

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: '*', // URL de votre frontend Angular
    methods: 'GET,POST,PUT,DELETE,PATCH', // Méthodes HTTP autorisées
    credentials: true, // Si des cookies ou des sessions sont utilisés
  })


  await app.listen( 3000);
  console.log('NestJS server running on http://localhost:3000');

}
bootstrap();
