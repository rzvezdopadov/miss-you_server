import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class MessageAddDto {
    @ApiProperty({
        type: `string`,
        description: `The name user`,
        example: `12334eWd`,
    })
    @IsNotEmpty()
    @IsString()
    userIdDst: string;

    @ApiProperty({
        type: `string`,
        description: `The stickerpack ID. When this field is not empty msg - this is filename of sticker`,
        example: `wefweDEFE554`,
    })
    @IsString()
    stpId: string;

    @ApiProperty({
        type: `string`,
        description: `The message`,
        example: `Hello my name is Betsi, i like the big bananas`,
        minLength: 0,
        maxLength: 400,
    })
    @IsString()
    @Length(1, 400, {
        message: `discription must be from 0 to 400 symbols`,
    })
    msg: string;

    @ApiProperty({
        type: `string`,
        description: `The repost ID. If this field is not empty, it has an ID by reference.`,
        example: `wefweDEFE554`,
    })
    @IsString()
    repostId: string;
}
