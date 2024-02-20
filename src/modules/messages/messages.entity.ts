import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Messages extends Model<Messages> {
    @Column({
        type: DataType.TEXT,
        unique: true,
        defaultValue: '',
        allowNull: false,
    })
    msgId: string;

    @Column({
        type: DataType.BIGINT,
        defaultValue: 0,
        allowNull: false,
    })
    timecode: number;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    userIdSrc: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    userIdDst: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    userIdDstRd: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    userIdSrcDel: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    })
    userIdDstDel: boolean;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    msg: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    stpId: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '',
        allowNull: false,
    })
    repostId: string;
}
