import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ProfileSetDto } from './profileSet.dto';

export class ProfileCreateDto extends ProfileSetDto {
    @IsNotEmpty()
    readonly userId: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly photoMain: number;

    @IsArray()
    readonly photoLinks: string[];

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly signZodiac: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly rating: number;
}
