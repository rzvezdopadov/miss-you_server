import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { likesProviders } from './likes.providers';
import { LikesService } from './likes.service';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';

@Module({
    imports: [],
    providers: [
        ...likesProviders,
        LikesService,
        ProfilesService,
        ...profilesProviders,
    ],
    controllers: [LikesController],
})
export class LikesModule {}
