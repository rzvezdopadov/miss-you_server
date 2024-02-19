import { AUTH_REPOSITORY } from '../../core/constants';
import { Auth } from './auth.entity';

export const authProviders = [
    {
        provide: AUTH_REPOSITORY,
        useValue: Auth,
    },
];
