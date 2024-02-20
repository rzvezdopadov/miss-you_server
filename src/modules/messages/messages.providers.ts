import { MESSAGES_REPOSITORY } from '../../core/constants';
import { Messages } from './messages.entity';

export const messagesProviders = [
    {
        provide: MESSAGES_REPOSITORY,
        useValue: Messages,
    },
];
