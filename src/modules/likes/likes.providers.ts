import { LIKES_REPOSITORY } from '../../core/constants';
import { Likes } from './likes.entity';

export const likesProviders = [
    {
        provide: LIKES_REPOSITORY,
        useValue: Likes,
    },
];
