import { IsNotEmpty, IsString } from 'class-validator';



export class ResetDTO {

    @IsNotEmpty()
    @IsString()
        email: string;
}