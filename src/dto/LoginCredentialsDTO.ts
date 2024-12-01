import { IsNotEmpty } from "class-validator";



export class LoginCredentialsDTO {
    
    @IsNotEmpty()
    name : string;
    
    @IsNotEmpty()
    password : string;
}