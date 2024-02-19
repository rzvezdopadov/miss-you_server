import { Inject, Injectable } from '@nestjs/common';
import { LIKES_REPOSITORY } from '../../core/constants';
import { Likes } from './likes.entity';
import { LikeDeleteDto } from './dto/likeDelete.dto';
import { LikeSetDto } from './dto/likeSet.dto';
import { LikesGetProfilesDto } from './dto/likesGetProfiles.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { Op } from 'sequelize';

@Injectable()
export class LikesService {
    constructor(
        @Inject(LIKES_REPOSITORY)
        private readonly likesRepository: typeof Likes,
        private readonly profilesService: ProfilesService,
    ) {}

    async getProfilesFromUserId(userId: string, payload: LikesGetProfilesDto) {
        const records = await this.likesRepository.findAll({
            attributes: ['userIdSrc'],
            where: {
                [Op.and]: [
                    { userIdDst: userId },
                    { userIdDstDel: false },
                    { userIdSrcDel: false },
                ],
            },
        });

        const newRecords = records.map((value) => {
            return {
                userId: value.userIdSrc,
            };
        });

        const profiles = await this.profilesService.findAllByFilters(
            userId,
            payload,
            newRecords,
        );

        return profiles;
    }
    async changeLikeById(userId: string, payload: LikeSetDto) {
        if (userId === payload.userIdDst) return '';

        const isHaveUser = await this.profilesService.findOneById(
            payload.userIdDst,
        );

        if (!isHaveUser?.userId) return '';

        const record = await this.getLikeById(userId, payload.userIdDst);

        if (!record?.userIdSrc) {
            // if record doesn`t have
            await this.likesRepository.create({
                userIdSrc: userId,
                userIdDst: payload.userIdDst,
            });

            return payload.userIdDst;
        } else {
            // if record already have, invert flag
            const userIdSrcDel = !record.userIdSrcDel;

            await this.likesRepository.update(
                { userIdSrcDel: !record.userIdSrcDel },
                {
                    where: {
                        userIdSrc: userId,
                        userIdDst: payload.userIdDst,
                    },
                },
            );

            return userIdSrcDel ? '' : payload.userIdDst;
        }
    }
    async deleteLikeById(userId: string, payload: LikeDeleteDto) {
        if (userId === payload.userIdSrc) return '';

        const record = await this.getLikeById(payload.userIdSrc, userId);
        console.log(payload.userIdSrc, userId);
        if (!record?.userIdSrc) return '';

        await this.likesRepository.update(
            { userIdDstDel: true },
            {
                where: {
                    userIdDst: userId,
                    userIdSrc: payload.userIdSrc,
                },
            },
        );

        return payload.userIdSrc;
    }
    async getLikeById(userIdSrc: string, userIdDst: string) {
        return await this.likesRepository.findOne<Likes>({
            where: { userIdSrc, userIdDst },
        });
    }
}
