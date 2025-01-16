import { IsNotEmpty } from "class-validator";



export class LoginCredentialsDTO {
    
    @IsNotEmpty()
    email : string;
    
    @IsNotEmpty()
    password : string;
}