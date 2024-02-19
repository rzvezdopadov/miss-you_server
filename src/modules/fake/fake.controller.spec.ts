import { Test, TestingModule } from '@nestjs/testing';
import { FakeController } from './fake.controller';
import { FakeService } from './fake.service';
import { AuthService } from '../auth/auth.service';
import { ProfilesService } from '../profiles/profiles.service';
import { JwtService } from '@nestjs/jwt';
import { authProviders } from '../auth/auth.providers';
import { profilesProviders } from '../profiles/profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';
import sequelize from 'sequelize';
import { Auth } from '../auth/auth.entity';
import { Profile } from '../profiles/profiles.entity';

describe('FakeController', () => {
    let controller: FakeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FakeController],
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

        controller = module.get<FakeController>(FakeController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('create users', async () => {
        await controller.generateUsers();
        const sequelizeDB = await databaseProviders[0].useFactory();
        const answerAuth = await sequelizeDB.query<Auth>(
            'SELECT * FROM public."Auths"',
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );
        const answerProfiles = await sequelizeDB.query<Profile>(
            `SELECT * FROM public."Profiles"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerAuth.length).toBe(500);
        expect(answerProfiles.length).toBe(500);
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
