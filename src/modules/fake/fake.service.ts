import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ProfilesService } from '../profiles/profiles.service';
import * as config from 'config';
import { TownsArr } from '../towns/towns.types';
import { Random } from '../../core/utils/random';
import {
    AlcoholArr,
    ChildrensArr,
    EducationArr,
    FieldOfActivityArr,
    Gender,
    GenderArr,
    GenderVaporArr,
    MaritalStatusArr,
    ProfitArr,
    ReligionArr,
    SmokeArr,
    WeightArr,
} from '../../core/types/profile.types';
import { SignUpDto } from '../auth/dto/sugnup.dto';
import {
    fakeInterests,
    fakeNamesMan,
    fakeNamesWoman,
    fakeSurnames,
    fakeUsersHello,
    fakeUsersPhotoMan,
    fakeUsersPhotoWoman,
} from './fake.data';
import { SYSTEM_CONST } from '../../core/constants';

const FAKE_USER_COUNT = config.get<number>('FAKE_USER_COUNT');
const DEFAULT_PASS_TEST_USER = config.get<string>('DEFAULT_PASS_TEST_USER');

@Injectable()
export class FakeService {
    constructor(
        private readonly authService: AuthService,
        private readonly profilesService: ProfilesService,
    ) {}
    async createUsers() {
        const isAlreadyHave = await this.profilesService.findAllUserId();

        if (isAlreadyHave[0]?.userId) return {};

        for (let i = 0; i < FAKE_USER_COUNT; i++) {
            const userId = await this.authService.createUniqueUserId();
            const auth: SignUpDto = {
                email: `${i}@gmail.com`,
                password: DEFAULT_PASS_TEST_USER,
                location: TownsArr[0],
                dayOfBirth: Random.getRandomInteger(1, 28),
                monthOfBirth: Random.getRandomInteger(1, 12),
                yearOfBirth: Random.getRandomInteger(1970, 2000),
                gender: Random.getRandomInteger(0, GenderArr.length - 1),
                genderVapor: Random.getRandomInteger(
                    0,
                    GenderVaporArr.length - 1,
                ),
                captcha: '',
            };
            const name =
                auth.gender === Gender.MALE
                    ? fakeNamesMan[
                          Random.getRandomInteger(0, fakeNamesMan.length - 1)
                      ]
                    : fakeNamesWoman[
                          Random.getRandomInteger(0, fakeNamesWoman.length - 1)
                      ];
            const fullName = `${name} ${fakeSurnames[Random.getRandomInteger(0, fakeSurnames.length - 1)]}`;
            const discription = `${
                fakeUsersHello[
                    Random.getRandomInteger(0, fakeUsersHello.length - 1)
                ]
            } меня зовут ${fullName}`;
            const photoCount = Random.getRandomInteger(0, 10);
            const photoNumberArr = Random.getUniqueIntegerArr(
                0,
                fakeUsersPhotoMan.length - 1,
                photoCount,
            );
            const photoLinks =
                auth.gender === Gender.MALE
                    ? photoNumberArr.map((value) => fakeUsersPhotoMan[value])
                    : photoNumberArr.map((value) => fakeUsersPhotoWoman[value]);
            const interests = Random.getUniqueIntegerArr(
                0,
                fakeInterests.length - 1,
                Random.getRandomInteger(0, 10),
            ).map((value) => fakeInterests[value]);
            const likeCharacter = Random.getUniqueIntegerArr(
                0,
                20,
                Random.getRandomInteger(0, 20),
            );
            const dontLikeCharacter = Random.getUniqueIntegerArr(
                0,
                20,
                Random.getRandomInteger(0, 20),
            );

            await this.authService.create(userId, auth);
            await this.profilesService.create({
                userId: userId,
                photoMain: Random.getRandomInteger(0, photoLinks.length - 1),
                photoLinks: photoLinks,
                signZodiac: 0,
                rating: Random.getRandomInteger(100, 10000),
                location: auth.location,
                name: fullName,
                discription: discription,
                dayOfBirth: auth.dayOfBirth,
                monthOfBirth: auth.monthOfBirth,
                yearOfBirth: auth.yearOfBirth,
                growth: Random.getRandomInteger(
                    SYSTEM_CONST.minGrowth,
                    SYSTEM_CONST.maxGrowth,
                ),
                weight: WeightArr[
                    Random.getRandomInteger(0, WeightArr.length - 1)
                ],
                gender: auth.gender,
                genderVapor: auth.genderVapor,
                education:
                    EducationArr[
                        Random.getRandomInteger(0, EducationArr.length - 1)
                    ],
                fieldOfActivity:
                    FieldOfActivityArr[
                        Random.getRandomInteger(
                            0,
                            FieldOfActivityArr.length - 1,
                        )
                    ],
                maritalStatus:
                    MaritalStatusArr[
                        Random.getRandomInteger(0, MaritalStatusArr.length - 1)
                    ],
                childrens:
                    ChildrensArr[
                        Random.getRandomInteger(0, ChildrensArr.length - 1)
                    ],
                religion:
                    ReligionArr[
                        Random.getRandomInteger(0, ReligionArr.length - 1)
                    ],
                smoke: SmokeArr[
                    Random.getRandomInteger(0, SmokeArr.length - 1)
                ],
                alcohol:
                    AlcoholArr[
                        Random.getRandomInteger(0, AlcoholArr.length - 1)
                    ],
                profit: ProfitArr[
                    Random.getRandomInteger(0, ProfitArr.length - 1)
                ],
                interests: interests,
                likeCharacter: likeCharacter,
                dontLikeCharacter: dontLikeCharacter,
            });
        }

        return {};
    }

    async deleteUsers() {
        const userIdsAuth = await this.authService.findAllUserId();
        userIdsAuth.forEach(
            async (value) => await this.authService.delete(value.userId),
        );

        const userIdsProfile = await this.profilesService.findAllUserId();
        userIdsProfile.forEach(
            async (value) => await this.profilesService.delete(value.userId),
        );

        return {};
    }
}
