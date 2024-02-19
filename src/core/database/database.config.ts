import { IDatabaseConfig } from './database.interface';
import * as config from 'config';

const username = config.get<string>('DB_USER');
const password = config.get<string>('DB_PASSWORD');
const database = config.get<string>('DB_DATABASE');
const host = config.get<string>('DB_HOST');
const port = config.get<number>('DB_PORT');
const dialect = 'postgres';

export const databaseConfig: IDatabaseConfig = {
    dev: {
        username,
        password,
        database,
        host,
        port,
        dialect,
        logging: false,
    },
    test: {
        username,
        password,
        database,
        host,
        port,
        dialect,
        logging: false,
    },
    prod: {
        username,
        password,
        database,
        host,
        port,
        dialect,
        logging: false,
    },
};
