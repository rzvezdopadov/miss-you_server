import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Likes extends Model<Likes> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    userIdSrc: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    userIdDst: string;

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
}
