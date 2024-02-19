import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IBanned } from '../banned/banned.types';
import { Acctype, AcctypeArr } from '../../core/types/auth.types';

@Table
export class Auth extends Model<Auth> {
    @Column({
        type: DataType.TEXT,
        unique: true,
        allowNull: false,
    })
    userId: string;

    @Column({
        type: DataType.TEXT,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0,
    })
    registrationDate: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: '',
    })
    phone: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    cash: number;

    @Column({
        type: DataType.ENUM,
        values: AcctypeArr,
        defaultValue: Acctype.USER,
        allowNull: false,
    })
    accType: string;

    @Column({
        type: DataType.JSON,
        defaultValue: {},
        allowNull: false,
    })
    banned: IBanned;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: '',
    })
    referral: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0,
    })
    deleteAcc: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: '',
    })
    tempPassCode: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0,
    })
    verifiAcc: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: '',
    })
    verifiAccCode: string;
}
