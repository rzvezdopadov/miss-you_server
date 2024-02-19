import { Module } from '@nestjs/common';
import { profilesProviders } from './profiles.providers';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';

@Module({
    providers: [ProfilesService, ...profilesProviders],
    controllers: [ProfilesController],
})
export class ProfilesModule {}
