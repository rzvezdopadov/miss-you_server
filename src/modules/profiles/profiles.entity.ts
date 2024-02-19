import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { TownsArr } from '../towns/towns.types';

@Table
export class Profile extends Model<Profile> {
    @Column({
        type: DataType.TEXT,
        unique: true,
        allowNull: false,
    })
    userId: string;

    @Column({
        type: DataType.BIGINT,
        defaultValue: 0,
        allowNull: false,
    })
    timecode: number;

    @Column({
        type: DataType.TEXT,
        values: TownsArr,
        allowNull: false,
    })
    location: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    discription: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1,
        allowNull: false,
    })
    dayOfBirth: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    monthOfBirth: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 2006,
        allowNull: false,
    })
    yearOfBirth: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    growth: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    weight: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    gender: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    genderVapor: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    photoMain: number;

    @Column({
        type: DataType.ARRAY(DataType.TEXT),
        defaultValue: [],
        allowNull: false,
    })
    photoLinks: string[];

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    signZodiac: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    education: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    fieldOfActivity: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    maritalStatus: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    childrens: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    religion: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    smoke: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    alcohol: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false,
    })
    profit: number;

    @Column({
        type: DataType.ARRAY(DataType.TEXT),
        defaultValue: [],
        allowNull: false,
    })
    interests: string[];

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        defaultValue: [],
        allowNull: false,
    })
    likeCharacter: number[];

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        defaultValue: [],
        allowNull: false,
    })
    dontLikeCharacter: number[];

    @Column({
        type: DataType.INTEGER,
        defaultValue: 10,
        allowNull: false,
    })
    rating: number;
}
