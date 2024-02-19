import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { profilesProviders } from './profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';

describe('ProfilesController', () => {
    let controller: ProfilesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfilesController],
            providers: [
                ProfilesService,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        controller = module.get<ProfilesController>(ProfilesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
