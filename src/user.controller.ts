import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { LoginCredentialsDTO } from './dto/LoginCredentialsDTO';


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}
    @Post()
    register(
        @Body() userData: UserSubscribeDto
    ): Promise<Partial<User>>
    {
        return this.userService.register(userData);
    }

    @Post('login')
    login(
        @Body() Credentials : LoginCredentialsDTO
    ): Promise<Partial<User>>
    {
        return this.userService.login(Credentials);
    }

}