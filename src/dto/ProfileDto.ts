import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';



export class ProfileDto {
    userId: number;  // L'ID de l'utilisateur

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    numerotelephone: number;

    @IsNotEmpty()
    @IsString()
    nationality: string;

    @IsNotEmpty()
    @Type(() => Date)
    birthdate: Date;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(13)
    age: number;

    @IsNotEmpty()
    @IsString()
    ville: string;

    @IsNotEmpty()
    @IsString()
    adresselivraison: string;

    



}
