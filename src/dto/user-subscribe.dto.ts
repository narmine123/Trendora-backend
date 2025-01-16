import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UserSubscribeDto{

    @IsNotEmpty()
    @IsString()

    name: string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

}