import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class MessagesGetDto {
    @ApiProperty({
        type: `string`,
        description: `The name user`,
        example: `12334eWd`,
    })
    @IsNotEmpty()
    @IsString()
    userIdDst: string;
    // Special
    @ApiProperty({
        type: `number`,
        description: `Start position users`,
        example: 2,
        minimum: 0,
        maximum: 2147483647,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly offset: number;

    @ApiProperty({
        type: `number`,
        description: `Count of users`,
        example: 2,
        minimum: 1,
        maximum: 50,
    })
    @IsNotEmpty()
    @IsNumber()
    @Max(50)
    readonly limit: number;
}
