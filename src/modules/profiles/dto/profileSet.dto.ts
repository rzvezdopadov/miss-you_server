import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsIn,
    IsNotEmpty,
    Length,
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
    Gender,
    GenderArr,
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
import { TimeDate } from '../../../core/utils/timedate';
import { TransformData } from '../../../core/utils/transformData';
import { TownsArr } from '../../../modules/towns/towns.types';

export class ProfileSetDto {
    @ApiProperty({
        type: `string`,
        description: `The town`,
        example: `${TownsArr[0]}`,
        examples: TownsArr,
    })
    @IsIn(TownsArr, { message: 'location must be only from server array' })
    readonly location: string;

    @ApiProperty({
        type: `string`,
        description: `The name user`,
        example: `Betsi`,
        minLength: 3,
        maxLength: 50,
    })
    @IsNotEmpty()
    @Length(3, 50, {
        message: `name must be from 3 to 50 symbols`,
    })
    readonly name: string;

    @ApiProperty({
        type: `string`,
        description: `The discription user`,
        example: `Hello my name is Betsi, i like the big bananas`,
        minLength: 0,
        maxLength: 400,
    })
    @Length(0, 400, {
        message: `discription must be from 0 to 400 symbols`,
    })
    readonly discription: string;

    @ApiProperty({
        type: `number`,
        description: `The day of birth`,
        example: 5,
        minimum: 1,
        maximum: 31,
    })
    @Min(1, { message: 'dayOfBirth must be from 1 to 31' })
    @Max(31, { message: 'dayOfBirth must be from 1 to 31' })
    readonly dayOfBirth: number;

    @ApiProperty({
        type: `number`,
        description: `The month of birth`,
        example: 5,
        minimum: 1,
        maximum: 12,
    })
    @Min(1, { message: 'monthOfBirth must be from 1 to 12' })
    @Max(12, { message: 'monthOfBirth must be from 1 to 12' })
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
        example: SYSTEM_CONST.minGrowth,
        description: `The growth user`,
        minimum: SYSTEM_CONST.minGrowth,
        maximum: SYSTEM_CONST.maxGrowth,
    })
    @Min(SYSTEM_CONST.minGrowth, {
        message: `growth must be from ${SYSTEM_CONST.minGrowth} to ${SYSTEM_CONST.maxGrowth}`,
    })
    @Max(SYSTEM_CONST.maxGrowth, {
        message: `growth must be from ${SYSTEM_CONST.minGrowth} to ${SYSTEM_CONST.maxGrowth}`,
    })
    readonly growth: number;

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

    @ApiProperty({
        type: `array of string`,
        description: `Interests of user`,
        example: ['Automobile', 'Films', 'Drink'],
    })
    @IsArray()
    readonly interests: string[];

    @ApiProperty({
        type: `array of number`,
        description: `Positive character for pair of user`,
        example: [1, 12, 10],
    })
    @IsArray()
    readonly likeCharacter: number[];

    @ApiProperty({
        type: `array of number`,
        description: `Negative character for pair of user`,
        example: [1, 12, 10],
    })
    @IsArray()
    readonly dontLikeCharacter: number[];
}
