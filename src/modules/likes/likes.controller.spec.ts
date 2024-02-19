import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { ProfilesService } from '../profiles/profiles.service';
import { likesProviders } from './likes.providers';
import { profilesProviders } from '../profiles/profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';

describe('LikesController', () => {
    let controller: LikesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LikesController],
            providers: [
                LikesService,
                ProfilesService,
                ...likesProviders,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        controller = module.get<LikesController>(LikesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
