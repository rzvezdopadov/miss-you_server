import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import * as config from 'config';

const USER_PASSWORD_LENGTH_MIN = config.get<number>('USER_PASSWORD_LENGTH_MIN');
const USER_PASSWORD_LENGTH_MAX = config.get<number>('USER_PASSWORD_LENGTH_MAX');

export class LoginDto {
    @ApiProperty({
        type: 'string',
        description: 'The user email',
        example: `example@gmail.com`,
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: 'string',
        description: 'The user password',
        example: `VasyaPetrov123456`,
        minLength: USER_PASSWORD_LENGTH_MIN,
        maxLength: USER_PASSWORD_LENGTH_MAX,
    })
    @IsNotEmpty()
    @Length(USER_PASSWORD_LENGTH_MIN, USER_PASSWORD_LENGTH_MAX, {
        message: `password must be from ${USER_PASSWORD_LENGTH_MIN} to ${USER_PASSWORD_LENGTH_MAX} symbols`,
    })
    readonly password: string;

    @ApiProperty({
        type: 'string',
        description: 'The captcha',
        example: `Us2ks`,
    })
    @IsNotEmpty()
    readonly captcha: string;
}
