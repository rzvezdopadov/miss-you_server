import { Module } from '@nestjs/common';
import { messagesProviders } from './messages.providers';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesGateway } from '../socket/socket.gateway';

@Module({
    imports: [],
    providers: [
        MessagesService,
        ProfilesService,
        ...messagesProviders,
        ...profilesProviders,
        MessagesGateway,
    ],
    controllers: [MessagesController],
})
export class MessagesModule {}
