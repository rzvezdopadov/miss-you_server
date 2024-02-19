import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikeDeleteDto {
    @ApiProperty({
        type: `string`,
        description: `The userId to delete like`,
        example: `145EcfW`,
    })
    @IsNotEmpty()
    @IsString()
    readonly userIdSrc: string;
}
