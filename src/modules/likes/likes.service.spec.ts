import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { likesProviders } from './likes.providers';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';
import { ProfileCreateDto } from '../profiles/dto/profileCreate.dto';
import { getForTestsProfilesCreateDto } from '../forTests/profiles';
import { Sequelize } from 'sequelize';
import { Likes } from './likes.entity';
import sequelize from 'sequelize';
import { SYSTEM_CONST } from '../../core/constants';
import { GenderVapor } from '../../core/types/profile.types';

describe('LikesService', () => {
    let service: LikesService;
    let profileService: ProfilesService;
    let fakeProfiles: ProfileCreateDto[] = [];
    let sequelizeDB: Sequelize;

    beforeAll(async () => {
        const moduleProfiles: TestingModule = await Test.createTestingModule({
            providers: [
                ProfilesService,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        profileService = moduleProfiles.get<ProfilesService>(ProfilesService);
        fakeProfiles = getForTestsProfilesCreateDto();
        sequelizeDB = await databaseProviders[0].useFactory();

        for (const profile of fakeProfiles) {
            await profileService.create(profile);
        }
    });

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

    it('change like', async () => {
        let answerLike = await service.changeLikeById(fakeProfiles[0].userId, {
            userIdDst: fakeProfiles[1].userId,
        });
        let answerDB = await sequelizeDB.query<Likes>(
            `SELECT * from public."Likes"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerLike).toBe(fakeProfiles[1].userId);
        expect(answerDB[0].userIdDst).toBe(fakeProfiles[1].userId);
        expect(answerDB[0].userIdSrc).toBe(fakeProfiles[0].userId);
        expect(answerDB[0].userIdDstDel).toBe(false);
        expect(answerDB[0].userIdSrcDel).toBe(false);

        answerLike = await service.changeLikeById(fakeProfiles[0].userId, {
            userIdDst: fakeProfiles[1].userId,
        });
        answerDB = await sequelizeDB.query<Likes>(
            `SELECT * from public."Likes"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerDB[0].userIdDst).toBe(fakeProfiles[1].userId);
        expect(answerDB[0].userIdSrc).toBe(fakeProfiles[0].userId);
        expect(answerDB[0].userIdDstDel).toBe(false);
        expect(answerDB[0].userIdSrcDel).toBe(true);
        expect(answerLike).toBe('');
    });

    it('delete like', async () => {
        let answerLike = await service.changeLikeById(fakeProfiles[0].userId, {
            userIdDst: fakeProfiles[1].userId,
        });

        answerLike = await service.deleteLikeById(fakeProfiles[1].userId, {
            userIdSrc: fakeProfiles[0].userId,
        });

        const answerDB = await sequelizeDB.query<Likes>(
            `SELECT * from public."Likes"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerDB[0].userIdDst).toBe(fakeProfiles[1].userId);
        expect(answerDB[0].userIdSrc).toBe(fakeProfiles[0].userId);
        expect(answerDB[0].userIdDstDel).toBe(true);
        expect(answerDB[0].userIdSrcDel).toBe(false);
        expect(answerLike).toBe(fakeProfiles[0].userId);
    });

    it('get profiles from like', async () => {
        const fakeProfilesNew = fakeProfiles.slice(3);
        for (const profile of fakeProfilesNew) {
            await service.changeLikeById(profile.userId, {
                userIdDst: fakeProfiles[2].userId,
            });
        }

        const answerProfiles = await service.getProfilesFromUserId(
            fakeProfiles[2].userId,
            {
                location: fakeProfiles[0].location,
                ageStart: SYSTEM_CONST.minAge,
                ageEnd: SYSTEM_CONST.maxAge,
                growthStart: SYSTEM_CONST.minGrowth,
                growthEnd: SYSTEM_CONST.maxGrowth,
                genderVapor: GenderVapor.ALL,
                signZodiac: 0,
                weight: 0,
                education: 0,
                fieldOfActivity: 0,
                maritalStatus: 0,
                childrens: 0,
                religion: 0,
                smoke: 0,
                alcohol: 0,
                profit: 0,
                offset: 0,
                limit: 50,
            },
        );

        expect(answerProfiles.length).toBe(3);
    });

    afterAll(async () => {
        await sequelizeDB.drop({});
    });
});
