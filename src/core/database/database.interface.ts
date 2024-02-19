import { Dialect } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';

export interface IDatabaseConfigAttributes extends SequelizeOptions {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number;
    dialect?: Dialect;
    urlDatabase?: string;
}

export interface IDatabaseConfig {
    dev: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    prod: IDatabaseConfigAttributes;
}
