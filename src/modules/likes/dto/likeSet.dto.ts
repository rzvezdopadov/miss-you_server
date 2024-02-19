import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikeSetDto {
    @ApiProperty({
        type: `string`,
        description: `The userId to like`,
        example: `145EcfW`,
    })
    @IsNotEmpty()
    @IsString()
    readonly userIdDst: string;
}
