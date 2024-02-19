import { PROFILES_REPOSITORY } from '../../core/constants';
import { Profile } from './profiles.entity';

export const profilesProviders = [
    {
        provide: PROFILES_REPOSITORY,
        useValue: Profile,
    },
];
