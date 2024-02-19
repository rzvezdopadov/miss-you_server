import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { likesProviders } from './likes.providers';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';

describe('LikesService', () => {
    let service: LikesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LikesService,
                ProfilesService,
                ...likesProviders,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        service = module.get<LikesService>(LikesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
