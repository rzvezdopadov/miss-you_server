import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDeleteDto {
    @ApiProperty({
        type: `string`,
        description: `The message ID`,
        example: `12334eWd`,
    })
    @IsNotEmpty()
    @IsString()
    msgId: string;
}
