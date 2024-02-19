import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { profilesProviders } from './profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';

describe('ProfilesService', () => {
    let service: ProfilesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfilesService,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        service = module.get<ProfilesService>(ProfilesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
