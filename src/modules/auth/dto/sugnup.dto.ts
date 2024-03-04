import {
    IsEmail,
    IsEnum,
    IsIn,
    IsNotEmpty,
    Length,
    Max,
    Min,
} from 'class-validator';
import { SYSTEM_CONST } from '../../../core/constants';
import { TimeDate } from '../../../core/utils/timedate';
import {
    Gender,
    GenderArr,
    GenderVapor,
    GenderVaporArr,
} from '../../../core/types/profile.types';
import { TownsArr } from '../../../modules/towns/towns.types';
import * as config from 'config';
import { ApiProperty } from '@nestjs/swagger';
import { TransformData } from '../../../core/utils/transformData';

const USER_PASSWORD_LENGTH_MIN = config.get<number>('USER_PASSWORD_LENGTH_MIN');
const USER_PASSWORD_LENGTH_MAX = config.get<number>('USER_PASSWORD_LENGTH_MAX');

export class SignUpDto {
    @ApiProperty({
        type: `string`,
        description: `The user email`,
        example: `example@gmail.com`,
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: `string`,
        description: `The user password`,
        example: `VasyaPetrov123456`,
        minLength: USER_PASSWORD_LENGTH_MIN,
        maxLength: USER_PASSWORD_LENGTH_MAX,
    })
    @Length(USER_PASSWORD_LENGTH_MIN, USER_PASSWORD_LENGTH_MAX, {
        message: `password must be from ${USER_PASSWORD_LENGTH_MIN} to ${USER_PASSWORD_LENGTH_MAX} symbols`,
    })
    readonly password: string;

    @ApiProperty({
        type: `string`,
        description: `The town`,
        example: `${TownsArr[0]}`,
        examples: TownsArr,
    })
    @IsIn(TownsArr, { message: `location must be only from server array` })
    readonly location: string;

    @ApiProperty({
        type: `number`,
        description: `The day of birth`,
        example: 5,
        minimum: 1,
        maximum: 31,
    })
    @Min(1, { message: `dayOfBirth must be from 1 to 31` })
    @Max(31, { message: `dayOfBirth must be from 1 to 31` })
    readonly dayOfBirth: number;

    @ApiProperty({
        type: `number`,
        description: `The month of birth`,
        example: 5,
        minimum: 1,
        maximum: 12,
    })
    @Min(0, { message: `monthOfBirth must be from 0 to 11` })
    @Max(11, { message: `monthOfBirth must be from 0 to 11` })
    readonly monthOfBirth: number;

    @ApiProperty({
        type: `number`,
        example: 1989,
        description: `The year of birth`,
        minimum: TimeDate.getYearFromAge(SYSTEM_CONST.maxAge),
        maximum: TimeDate.getYearFromAge(SYSTEM_CONST.minAge),
    })
    @Min(TimeDate.getYearFromAge(SYSTEM_CONST.maxAge), {
        message: `yearOfBirth must be from ${TimeDate.getYearFromAge(SYSTEM_CONST.maxAge)} to ${TimeDate.getYearFromAge(SYSTEM_CONST.minAge)}`,
    })
    @Max(TimeDate.getYearFromAge(SYSTEM_CONST.minAge), {
        message: `yearOfBirth must be from ${TimeDate.getYearFromAge(SYSTEM_CONST.maxAge)} to ${TimeDate.getYearFromAge(SYSTEM_CONST.minAge)}`,
    })
    readonly yearOfBirth: number;

    @ApiProperty({
        type: `number`,
        description: `Gender our user: ${TransformData.NumericEnumToArrSrtWithKey(Gender)}`,
        example: 1,
        minimum: 0,
        maximum: GenderArr.length - 1,
    })
    @IsEnum(Gender, {
        message: `gender must be only from 0 to ${GenderArr.length - 1}`,
    })
    readonly gender: number;

    @ApiProperty({
        type: `number`,
        description: `Gender for pair our user: ${TransformData.NumericEnumToArrSrtWithKey(GenderVapor)}`,
        example: 2,
        minimum: 0,
        maximum: GenderVaporArr.length - 1,
    })
    @IsEnum(GenderVapor, {
        message: `genderVapor must be only from 0 to ${GenderVaporArr.length - 1}`,
    })
    readonly genderVapor: number;

    @ApiProperty({
        type: 'string',
        description: 'The captcha',
        example: `Us2ks`,
    })
    @IsNotEmpty()
    readonly captcha: string;
}
