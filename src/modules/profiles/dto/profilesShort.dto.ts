import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { SYSTEM_CONST } from '../../../core/constants';
import {
    Alcohol,
    AlcoholArr,
    Childrens,
    ChildrensArr,
    Education,
    EducationArr,
    FieldOfActivity,
    FieldOfActivityArr,
    GenderVapor,
    GenderVaporArr,
    MaritalStatus,
    MaritalStatusArr,
    Profit,
    ProfitArr,
    Religion,
    ReligionArr,
    Smoke,
    SmokeArr,
    Weight,
    WeightArr,
} from '../../../core/types/profile.types';
import { TransformData } from '../../../core/utils/transformData';
import { TownsArr } from '../../../modules/towns/towns.types';

export class ProfilesShortDto {
    @ApiProperty({
        type: `string`,
        description: `The town`,
        example: `${TownsArr[0]}`,
        examples: TownsArr,
    })
    @IsNotEmpty()
    @IsString()
    readonly location: string;

    @ApiProperty({
        type: `number`,
        description: `The age start`,
        example: SYSTEM_CONST.minAge,
        minimum: SYSTEM_CONST.minAge,
        maximum: SYSTEM_CONST.maxAge,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(SYSTEM_CONST.minAge)
    @Max(SYSTEM_CONST.maxAge)
    readonly ageStart: number;

    @ApiProperty({
        type: `number`,
        description: `The age end`,
        example: SYSTEM_CONST.maxAge,
        minimum: SYSTEM_CONST.minAge,
        maximum: SYSTEM_CONST.maxAge,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(SYSTEM_CONST.minAge)
    @Max(SYSTEM_CONST.maxAge)
    readonly ageEnd: number;

    @ApiProperty({
        type: `number`,
        description: `The growth start`,
        example: SYSTEM_CONST.minGrowth,
        minimum: SYSTEM_CONST.minGrowth,
        maximum: SYSTEM_CONST.maxGrowth,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly growthStart: number;

    @ApiProperty({
        type: `number`,
        description: `The growth end`,
        example: SYSTEM_CONST.maxGrowth,
        minimum: SYSTEM_CONST.minGrowth,
        maximum: SYSTEM_CONST.maxGrowth,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly growthEnd: number;

    @ApiProperty({
        type: `number`,
        description: `Gender for pair our user: ${TransformData.NumericEnumToArrSrtWithKey(GenderVapor)}`,
        example: 2,
        minimum: 0,
        maximum: GenderVaporArr.length - 1,
    })
    @IsEnum(GenderVapor, {
        message: 'gender must be either all, male or female',
    })
    readonly genderVapor: number;

    @ApiProperty({
        type: `number`,
        description: `Sign of zodiac: 0 - all sign, other local sign 1 - 12 `,
        example: 2,
        minimum: 0,
        maximum: 12,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly signZodiac: number;

    @ApiProperty({
        type: `number`,
        description: `Weight user: ${TransformData.NumericEnumToArrSrtWithKey(Weight)}`,
        example: 2,
        minimum: 0,
        maximum: WeightArr.length - 1,
    })
    @IsEnum(Weight, {
        message: `weight must be only from 0 to ${WeightArr.length - 1}`,
    })
    readonly weight: number;

    @ApiProperty({
        type: `number`,
        description: `Education user: ${TransformData.NumericEnumToArrSrtWithKey(Education)}`,
        example: 2,
        minimum: 0,
        maximum: EducationArr.length - 1,
    })
    @IsEnum(Education, {
        message: `education must be only from 0 to ${EducationArr.length - 1}`,
    })
    readonly education: number;

    @ApiProperty({
        type: `number`,
        description: `Field of activity user: ${TransformData.NumericEnumToArrSrtWithKey(FieldOfActivity)}`,
        example: 2,
        minimum: 0,
        maximum: FieldOfActivityArr.length - 1,
    })
    @IsEnum(FieldOfActivity, {
        message: `fieldOfActivity must be only from 0 to ${FieldOfActivityArr.length - 1}`,
    })
    readonly fieldOfActivity: number;

    @ApiProperty({
        type: `number`,
        description: `Marital status user: ${TransformData.NumericEnumToArrSrtWithKey(MaritalStatus)}`,
        example: 2,
        minimum: 0,
        maximum: MaritalStatusArr.length - 1,
    })
    @IsEnum(MaritalStatus, {
        message: `maritalStatus must be only from 0 to ${MaritalStatusArr.length - 1}`,
    })
    readonly maritalStatus: number;

    @ApiProperty({
        type: `number`,
        description: `Childrens of user: ${TransformData.NumericEnumToArrSrtWithKey(Childrens)}`,
        example: 2,
        minimum: 0,
        maximum: ChildrensArr.length - 1,
    })
    @IsEnum(Childrens, {
        message: `childrens must be only from 0 to ${ChildrensArr.length - 1}`,
    })
    readonly childrens: number;

    @ApiProperty({
        type: `number`,
        description: `Religion of user: ${TransformData.NumericEnumToArrSrtWithKey(Religion)}`,
        example: 2,
        minimum: 0,
        maximum: ReligionArr.length - 1,
    })
    @IsEnum(Religion, {
        message: `religion must be only from 0 to ${ReligionArr.length - 1}`,
    })
    readonly religion: number;

    @ApiProperty({
        type: `number`,
        description: `Smoke of user: ${TransformData.NumericEnumToArrSrtWithKey(Smoke)}`,
        example: 2,
        minimum: 0,
        maximum: SmokeArr.length - 1,
    })
    @IsEnum(Smoke, {
        message: `smoke must be only from 0 to ${SmokeArr.length - 1}`,
    })
    readonly smoke: number;

    @ApiProperty({
        type: `number`,
        description: `Alcohol of user: ${TransformData.NumericEnumToArrSrtWithKey(Alcohol)}`,
        example: 2,
        minimum: 0,
        maximum: AlcoholArr.length - 1,
    })
    @IsEnum(Alcohol, {
        message: `alcohol must be only from 0 to ${AlcoholArr.length - 1}`,
    })
    readonly alcohol: number;

    @ApiProperty({
        type: `number`,
        description: `Profit of user: ${TransformData.NumericEnumToArrSrtWithKey(Profit)}`,
        example: 2,
        minimum: 0,
        maximum: ProfitArr.length - 1,
    })
    @IsEnum(Profit, {
        message: `profit must be only from 0 to ${ProfitArr.length - 1}`,
    })
    readonly profit: number;

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
