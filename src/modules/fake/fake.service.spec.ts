import { Test, TestingModule } from '@nestjs/testing';
import { FakeService } from './fake.service';
import { AuthService } from '../auth/auth.service';
import { ProfilesService } from '../profiles/profiles.service';
import { authProviders } from '../auth/auth.providers';
import { profilesProviders } from '../profiles/profiles.providers';
import { JwtService } from '@nestjs/jwt';
import { databaseProviders } from '../../core/database/database.providers';

describe('FakeService', () => {
    let service: FakeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FakeService,
                AuthService,
                ProfilesService,
                JwtService,
                ...authProviders,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        service = module.get<FakeService>(FakeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
