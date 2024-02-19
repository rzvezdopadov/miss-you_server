import { getSignZodiac } from '../../core/utils/signZodiac';
import { fakeNamesWoman, fakeSurnames } from '../fake/fake.data';
import { ProfileCreateDto } from '../profiles/dto/profileCreate.dto';
import { TownsArr } from '../towns/towns.types';
import {
    AlcoholArr,
    ChildrensArr,
    EducationArr,
    FieldOfActivityArr,
    GenderArr,
    GenderVaporArr,
    MaritalStatusArr,
    ProfitArr,
    ReligionArr,
    SmokeArr,
    WeightArr,
} from '../../core/types/profile.types';
import { Random } from '../../core/utils/random';
import { SYSTEM_CONST } from '../../core/constants';

export function getForTestsProfilesCreateDto() {
    const fakeProfiles: ProfileCreateDto[] = [];

    for (let i = 0; i < 10; i++) {
        const dayOfBirth = Math.floor(1 + i * 2);
        const monthOfBirth = 1 + i;
        const profile: ProfileCreateDto = {
            userId: `test${1000 + i}`,
            photoMain: 0,
            photoLinks: [],
            rating: i * 100,
            location: TownsArr[0],
            name: fakeNamesWoman[i],
            discription: `${fakeSurnames[i]} ${fakeNamesWoman[i]}`,
            dayOfBirth: dayOfBirth,
            monthOfBirth: monthOfBirth,
            yearOfBirth: 1990 + i,
            signZodiac: getSignZodiac(dayOfBirth, monthOfBirth),
            growth:
                SYSTEM_CONST.minGrowth +
                Math.round(
                    (SYSTEM_CONST.maxGrowth - SYSTEM_CONST.minGrowth) / 10,
                ),
            weight: Math.floor((i * WeightArr.length) / 10),
            gender: Math.floor((i * GenderArr.length) / 10),
            genderVapor: Math.floor((i * GenderVaporArr.length) / 10),
            education: Math.floor((i * EducationArr.length) / 10),
            fieldOfActivity: Math.floor((i * FieldOfActivityArr.length) / 10),
            maritalStatus: Math.floor((i * MaritalStatusArr.length) / 10),
            childrens: Math.floor((i * ChildrensArr.length) / 10),
            religion: Math.floor((i * ReligionArr.length) / 10),
            smoke: Math.floor((i * SmokeArr.length) / 10),
            alcohol: Math.floor((i * AlcoholArr.length) / 10),
            profit: Math.floor((i * ProfitArr.length) / 10),
            interests: ['programm', 'toy', 'girls'],
            likeCharacter: Random.getUniqueIntegerArr(0, 20, 5),
            dontLikeCharacter: Random.getUniqueIntegerArr(0, 20, 5),
        };

        fakeProfiles.push(profile);
    }

    return fakeProfiles;
}
