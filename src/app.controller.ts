import { Controller } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  getHello(): string {
    return 'Hello World!'; 
  }
  constructor(private readonly appService: AppService,

  ) {}

}