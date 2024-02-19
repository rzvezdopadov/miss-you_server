import { Inject, Injectable } from '@nestjs/common';
import { ProfilesShortDto } from './dto/profilesShort.dto';
import { PROFILES_REPOSITORY } from '../../core/constants';
import { Profile } from './profiles.entity';
import { ProfileSetDto } from './dto/profileSet.dto';
import { ProfileCreateDto } from './dto/profileCreate.dto';
import { getSignZodiac } from '../../core/utils/signZodiac';
import { Op } from 'sequelize';
import { TimeDate } from '../../core/utils/timedate';
import { GenderVapor } from '../../core/types/profile.types';

@Injectable()
export class ProfilesService {
    constructor(
        @Inject(PROFILES_REPOSITORY)
        private readonly profilesRepository: typeof Profile,
    ) {}

    async create(profile: ProfileCreateDto): Promise<Profile> {
        const newProfile = { ...profile };

        newProfile.signZodiac = getSignZodiac(
            newProfile.dayOfBirth,
            newProfile.monthOfBirth,
        );

        return await this.profilesRepository.create<Profile>(newProfile);
    }

    async delete(userId: string | string[]) {
        if (Array.isArray(userId)) {
            userId.forEach(async (value) => {
                await this.profilesRepository.destroy({ where: { value } });
            });
        } else {
            await this.profilesRepository.destroy({ where: { userId } });
        }

        return {};
    }

    async findAllUserId(): Promise<Profile[]> {
        return await this.profilesRepository.findAll<Profile>({
            attributes: ['userId'],
        });
    }

    async findOneById(userId: string): Promise<Profile> {
        return await this.profilesRepository.findOne<Profile>({
            attributes: [
                'userId',
                'timecode',
                'location',
                'name',
                'discription',
                'dayOfBirth',
                'monthOfBirth',
                'yearOfBirth',
                'growth',
                'weight',
                'gender',
                'genderVapor',
                'photoMain',
                'photoLinks',
                'signZodiac',
                'education',
                'fieldOfActivity',
                'maritalStatus',
                'childrens',
                'religion',
                'smoke',
                'alcohol',
                'profit',
                'interests',
                'likeCharacter',
                'dontLikeCharacter',
                'rating',
            ],
            where: { userId },
        });
    }

    async findAllByFilters(
        userId: string,
        payload: ProfilesShortDto,
        userIds?: { userId: string }[],
    ) {
        const opt = { ...payload };
        const ourProfile = await this.findOneById(userId);

        return await this.profilesRepository.findAll({
            attributes: [
                'userId',
                'timecode',
                'name',
                'dayOfBirth',
                'monthOfBirth',
                'yearOfBirth',
                'gender',
                'genderVapor',
                'photoMain',
                'photoLinks',
                'interests',
                'rating',
            ],
            where: {
                [Op.and]: [
                    userIds && userIds.length
                        ? {
                              [Op.or]: userIds,
                          }
                        : {},
                    { location: opt.location },
                    {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    {
                                        yearOfBirth: {
                                            [Op.lt]: TimeDate.getYearFromAge(
                                                opt.ageStart,
                                            ),
                                        },
                                    },
                                    {
                                        yearOfBirth: {
                                            [Op.gt]: TimeDate.getYearFromAge(
                                                opt.ageEnd,
                                            ),
                                        },
                                    },
                                ],
                            },
                            {
                                yearOfBirth: {
                                    [Op.eq]: TimeDate.getYearFromAge(
                                        opt.ageStart,
                                    ),
                                },
                            },
                            {
                                yearOfBirth: {
                                    [Op.eq]: TimeDate.getYearFromAge(
                                        opt.ageEnd,
                                    ),
                                },
                            },
                        ],
                    },
                    {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    {
                                        growth: {
                                            [Op.gt]: opt.growthStart,
                                        },
                                    },
                                    {
                                        growth: {
                                            [Op.lt]: opt.growthEnd,
                                        },
                                    },
                                ],
                            },
                            {
                                growth: {
                                    [Op.eq]: opt.growthStart,
                                },
                            },
                            {
                                growth: {
                                    [Op.eq]: opt.growthEnd,
                                },
                            },
                        ],
                    },
                    opt.genderVapor === GenderVapor.ALL
                        ? { genderVapor: opt.genderVapor }
                        : {
                              [Op.and]: [
                                  { genderVapor: ourProfile.gender },
                                  { gender: opt.genderVapor },
                              ],
                          },
                    opt.signZodiac ? { signZodiac: opt.signZodiac } : {},
                    opt.weight ? { weight: opt.weight } : {},
                    opt.education ? { education: opt.education } : {},
                    opt.fieldOfActivity
                        ? { fieldOfActivity: opt.fieldOfActivity }
                        : {},
                    opt.maritalStatus
                        ? { maritalStatus: opt.maritalStatus }
                        : {},
                    opt.childrens ? { childrens: opt.childrens } : {},
                    opt.religion ? { religion: opt.religion } : {},
                    opt.smoke ? { smoke: opt.smoke } : {},
                    opt.alcohol ? { alcohol: opt.alcohol } : {},
                    opt.profit ? { profit: opt.profit } : {},
                ],
            },
            order: [['rating', 'DESC']],
            offset: opt.offset,
            limit: opt.limit,
        });
    }

    async updateById(userId: string, payload: ProfileSetDto) {
        const profile = { ...payload };

        const signZodiac = getSignZodiac(
            profile.dayOfBirth,
            profile.monthOfBirth,
        );
        profile.interests = profile.interests.filter(
            (value) => typeof value === 'string',
        );
        profile.likeCharacter = profile.likeCharacter.filter(
            (value) => typeof value === 'number',
        );
        profile.likeCharacter = Array.from(new Set(profile.likeCharacter));
        profile.dontLikeCharacter = profile.dontLikeCharacter.filter(
            (value) => typeof value === 'number',
        );
        profile.dontLikeCharacter = Array.from(
            new Set(profile.dontLikeCharacter),
        );

        return await this.profilesRepository.update(
            { ...profile, signZodiac },
            {
                where: {
                    userId,
                },
            },
        );
    }
}
