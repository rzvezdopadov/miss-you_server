import { Module } from '@nestjs/common';
import { FakeService } from './fake.service';
import { AuthService } from '../auth/auth.service';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { authProviders } from '../auth/auth.providers';
import { FakeController } from './fake.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    providers: [
        FakeService,
        ProfilesService,
        ...profilesProviders,
        AuthService,
        ...authProviders,
        JwtService,
    ],
    controllers: [FakeController],
})
export class FakeModule {}
