import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { profilesProviders } from './profiles.providers';
import { databaseProviders } from '../../core/database/database.providers';
import { ProfileCreateDto } from './dto/profileCreate.dto';
import { TownsArr } from '../towns/towns.types';
import { fakeNamesWoman } from '../fake/fake.data';
import {
    AlcoholArr,
    ChildrensArr,
    EducationArr,
    FieldOfActivityArr,
    GenderArr,
    GenderVapor,
    GenderVaporArr,
    MaritalStatusArr,
    ProfitArr,
    ReligionArr,
    SmokeArr,
    WeightArr,
} from '../../core/types/profile.types';
import { Sequelize } from 'sequelize';
import sequelize from 'sequelize';
import { Profile } from './profiles.entity';
import { TimeDate } from '../../core/utils/timedate';
import { ProfileSetDto } from './dto/profileSet.dto';
import { Random } from '../../core/utils/random';
import { SYSTEM_CONST } from '../../core/constants';
import { getForTestsProfilesCreateDto } from '../forTests/profiles';

describe('ProfilesService', () => {
    let service: ProfilesService;
    let fakeProfiles: ProfileCreateDto[] = [];
    let sequelizeDB: Sequelize;
    const TEST_USER_COUNT = 10;

    beforeAll(async () => {
        fakeProfiles = getForTestsProfilesCreateDto();
        sequelizeDB = await databaseProviders[0].useFactory();
    });

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

    it('create profiles', async () => {
        for (const profile of fakeProfiles) {
            await service.create(profile);
        }

        const answerProfiles = await sequelizeDB.query<Profile>(
            `SELECT * FROM public."Profiles" ORDER BY rating DESC`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerProfiles.length).toBe(TEST_USER_COUNT);

        const UC_END = TEST_USER_COUNT - 1;
        // First and End profile, bacause sorting is DESC!
        expect(answerProfiles[0].userId).toBe(fakeProfiles[UC_END].userId);
        expect(answerProfiles[0].location).toBe(fakeProfiles[UC_END].location);
        expect(answerProfiles[0].name).toBe(fakeProfiles[UC_END].name);
        expect(answerProfiles[0].discription).toBe(
            fakeProfiles[UC_END].discription,
        );
        expect(answerProfiles[0].dayOfBirth).toBe(
            fakeProfiles[UC_END].dayOfBirth,
        );
        expect(answerProfiles[0].monthOfBirth).toBe(
            fakeProfiles[UC_END].monthOfBirth,
        );
        expect(answerProfiles[0].yearOfBirth).toBe(
            fakeProfiles[UC_END].yearOfBirth,
        );
        expect(answerProfiles[0].signZodiac).toBe(
            fakeProfiles[UC_END].signZodiac,
        );
        expect(answerProfiles[0].growth).toBe(fakeProfiles[UC_END].growth);
        expect(answerProfiles[0].weight).toBe(fakeProfiles[UC_END].weight);
        expect(answerProfiles[0].gender).toBe(fakeProfiles[UC_END].gender);
        expect(answerProfiles[0].genderVapor).toBe(
            fakeProfiles[UC_END].genderVapor,
        );
        expect(answerProfiles[0].education).toBe(
            fakeProfiles[UC_END].education,
        );
        expect(answerProfiles[0].fieldOfActivity).toBe(
            fakeProfiles[UC_END].fieldOfActivity,
        );
        expect(answerProfiles[0].maritalStatus).toBe(
            fakeProfiles[UC_END].maritalStatus,
        );
        expect(answerProfiles[0].childrens).toBe(
            fakeProfiles[UC_END].childrens,
        );
        expect(answerProfiles[0].religion).toBe(fakeProfiles[UC_END].religion);
        expect(answerProfiles[0].smoke).toBe(fakeProfiles[UC_END].smoke);
        expect(answerProfiles[0].alcohol).toBe(fakeProfiles[UC_END].alcohol);
        expect(answerProfiles[0].profit).toBe(fakeProfiles[UC_END].profit);
        expect(answerProfiles[0].rating).toBe(fakeProfiles[UC_END].rating);
    });

    it('get all profiles', async () => {
        const answerProfiles = await service.findAllUserId();

        expect(answerProfiles.length).toBe(TEST_USER_COUNT);
    });

    it('get one profile', async () => {
        const answerProfiles = await service.findOneById(
            fakeProfiles[0].userId,
        );

        expect(answerProfiles.userId).toBe(fakeProfiles[0].userId);
        expect(answerProfiles.signZodiac).toBe(fakeProfiles[0].signZodiac);
    });

    it('search with filter', async () => {
        const UC_END = TEST_USER_COUNT - 1;
        const age = TimeDate.getYearFromAge(fakeProfiles[UC_END].yearOfBirth);
        const answerProfiles = await service.findAllByFilters(
            fakeProfiles[0].userId,
            {
                location: fakeProfiles[UC_END].location,
                ageStart: age,
                ageEnd: age,
                growthStart: fakeProfiles[UC_END].growth,
                growthEnd: fakeProfiles[UC_END].growth,
                genderVapor: GenderVapor.ALL,
                signZodiac: fakeProfiles[UC_END].signZodiac,
                weight: fakeProfiles[UC_END].weight,
                education: fakeProfiles[UC_END].education,
                fieldOfActivity: fakeProfiles[UC_END].fieldOfActivity,
                maritalStatus: fakeProfiles[UC_END].maritalStatus,
                childrens: fakeProfiles[UC_END].childrens,
                religion: fakeProfiles[UC_END].religion,
                smoke: fakeProfiles[UC_END].smoke,
                alcohol: fakeProfiles[UC_END].alcohol,
                profit: fakeProfiles[UC_END].profit,
                offset: 0,
                limit: 50,
            },
        );

        expect(answerProfiles.length).toBe(1);
    });

    it('update by id', async () => {
        const fakeProfile: ProfileSetDto = {
            location: TownsArr[Random.getRandomInteger(0, TownsArr.length - 1)],
            name: fakeNamesWoman[
                Random.getRandomInteger(0, fakeNamesWoman.length - 1)
            ],
            discription: `testing ${fakeNamesWoman[Random.getRandomInteger(0, fakeNamesWoman.length - 1)]}`,
            dayOfBirth: Random.getRandomInteger(1, 28),
            monthOfBirth: Random.getRandomInteger(1, 12),
            yearOfBirth: Random.getRandomInteger(1990, 2000),
            growth: Random.getRandomInteger(
                SYSTEM_CONST.minGrowth,
                SYSTEM_CONST.maxGrowth,
            ),
            weight: Random.getRandomInteger(0, WeightArr.length - 1),
            gender: Random.getRandomInteger(0, GenderArr.length - 1),
            genderVapor: Random.getRandomInteger(0, GenderVaporArr.length - 1),
            education: Random.getRandomInteger(0, EducationArr.length - 1),
            fieldOfActivity: Random.getRandomInteger(
                0,
                FieldOfActivityArr.length - 1,
            ),
            maritalStatus: Random.getRandomInteger(
                0,
                MaritalStatusArr.length - 1,
            ),
            childrens: Random.getRandomInteger(0, ChildrensArr.length - 1),
            religion: Random.getRandomInteger(0, ReligionArr.length - 1),
            smoke: Random.getRandomInteger(0, SmokeArr.length - 1),
            alcohol: Random.getRandomInteger(0, AlcoholArr.length - 1),
            profit: Random.getRandomInteger(0, ProfitArr.length - 1),
            interests: ['1', '2', '3'],
            likeCharacter: Random.getUniqueIntegerArr(0, 20, 3),
            dontLikeCharacter: Random.getUniqueIntegerArr(0, 20, 3),
        };

        await service.updateById(fakeProfiles[0].userId, fakeProfile);
        const answerProfile = await service.findOneById(fakeProfiles[0].userId);

        expect(fakeProfile.location).toBe(answerProfile.location);
        expect(fakeProfile.name).toBe(answerProfile.name);
        expect(fakeProfile.discription).toBe(answerProfile.discription);
        expect(fakeProfile.dayOfBirth).toBe(answerProfile.dayOfBirth);
        expect(fakeProfile.monthOfBirth).toBe(answerProfile.monthOfBirth);
        expect(fakeProfile.yearOfBirth).toBe(answerProfile.yearOfBirth);
        expect(fakeProfile.growth).toBe(answerProfile.growth);
        expect(fakeProfile.weight).toBe(answerProfile.weight);
        expect(fakeProfile.gender).toBe(answerProfile.gender);
        expect(fakeProfile.genderVapor).toBe(answerProfile.genderVapor);
        expect(fakeProfile.education).toBe(answerProfile.education);
        expect(fakeProfile.fieldOfActivity).toBe(answerProfile.fieldOfActivity);
        expect(fakeProfile.maritalStatus).toBe(answerProfile.maritalStatus);
        expect(fakeProfile.childrens).toBe(answerProfile.childrens);
        expect(fakeProfile.religion).toBe(answerProfile.religion);
        expect(fakeProfile.smoke).toBe(answerProfile.smoke);
        expect(fakeProfile.alcohol).toBe(answerProfile.alcohol);
        expect(fakeProfile.profit).toBe(answerProfile.profit);
        expect(fakeProfile.interests[0]).toBe(answerProfile.interests[0]);
        expect(fakeProfile.interests.length).toBe(
            answerProfile.interests.length,
        );
        expect(fakeProfile.likeCharacter[1]).toBe(
            answerProfile.likeCharacter[1],
        );
        expect(fakeProfile.likeCharacter.length).toBe(
            answerProfile.likeCharacter.length,
        );
        expect(fakeProfile.dontLikeCharacter[2]).toBe(
            answerProfile.dontLikeCharacter[2],
        );
        expect(fakeProfile.dontLikeCharacter.length).toBe(
            answerProfile.dontLikeCharacter.length,
        );
    });

    it('delete profile', async () => {
        await service.delete(fakeProfiles[0].userId);
        const answerProfile = await service.findOneById(fakeProfiles[0].userId);
        const answerProfiles = await service.findAllUserId();

        expect(answerProfile).toBeNull();
        expect(answerProfiles.length).toBe(TEST_USER_COUNT - 1);
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
