import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from './database.config';
import * as config from 'config';
import { IDatabaseConfigAttributes } from './database.interface';
import { SERVER } from '../constants';
import { Auth } from '../../modules/auth/auth.entity';
import { Profile } from '../../modules/profiles/profiles.entity';
import { Likes } from '../../modules/likes/likes.entity';
import { Messages } from '../../modules/messages/messages.entity';

const server = config.get('SERVER') || SERVER.dev;

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            let config: IDatabaseConfigAttributes;
            switch (server) {
                case SERVER.dev:
                    config = databaseConfig.dev;
                    break;
                case SERVER.test:
                    config = databaseConfig.test;
                    break;
                case SERVER.prod:
                    config = databaseConfig.prod;
                    break;
                default:
                    config = databaseConfig.dev;
            }

            const sequelize = new Sequelize(config);

            sequelize.addModels([Auth, Profile, Likes, Messages]);
            await sequelize.sync();

            return sequelize;
        },
    },
];
