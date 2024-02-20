import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES_REPOSITORY } from '../../core/constants';
import { Messages } from './messages.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { MessageAddDto } from './dto/messageAdd.dto';
import { Random } from '../../core/utils/random';
import { Op } from 'sequelize';
import { TimeDate } from '../../core/utils/timedate';
import { MessagesGetDto } from './dto/messagesGet.dto';

@Injectable()
export class MessagesService {
    constructor(
        @Inject(MESSAGES_REPOSITORY)
        private readonly messagesRepository: typeof Messages,
        private readonly profilesService: ProfilesService,
    ) {}

    async findAllDialogsByUserId(userId: string) {
        const answer = await this.messagesRepository.findAll({
            attributes: ['userIdSrc', 'userIdDst'],
            where: {
                [Op.or]: [{ userIdDst: userId }, { userIdSrc: userId }],
            },
        });

        const newArr = Array.from(
            new Set(
                answer.map((value) => {
                    if (value.userIdDst !== userId) return value.userIdDst;
                    if (value.userIdSrc !== userId) return value.userIdSrc;
                }),
            ),
        );

        return newArr;
    }

    async findAllMsgByUserId(userId: string, payload: MessagesGetDto) {
        if (userId === payload.userIdDst) return [];

        const isHaveUser = await this.profilesService.findOneById(
            payload.userIdDst,
        );

        if (!isHaveUser) return [];

        return await this.messagesRepository.findAll({
            attributes: [
                'msgId',
                'timecode',
                'userIdSrc',
                'userIdDst',
                'userIdDstRd',
                'msg',
                'stpId',
                'repostId',
            ],
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    { userIdDst: userId },
                                    { userIdSrc: payload.userIdDst },
                                ],
                            },
                            {
                                [Op.and]: [
                                    { userIdDst: payload.userIdDst },
                                    { userIdSrc: userId },
                                ],
                            },
                        ],
                    },
                    {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    { userIdDst: userId },
                                    { userIdDstDel: false },
                                ],
                            },
                            {
                                [Op.and]: [
                                    { userIdSrc: userId },
                                    { userIdSrcDel: false },
                                ],
                            },
                        ],
                    },
                ],
            },
            order: [['timecode', 'ASC']],
            offset: payload.offset,
            limit: payload.limit,
        });
    }

    async addMsgByUserId(userId: string, payload: MessageAddDto) {
        if (userId === payload.userIdDst) return undefined;

        const isHaveUser = await this.profilesService.findOneById(
            payload.userIdDst,
        );

        if (!isHaveUser) return undefined;

        const msgId = await this.createUniqueMsgId();
        const timecode = TimeDate.getTimecodeNow();

        const message = {
            msgId,
            timecode,
            userIdSrc: userId,
            userIdDst: payload.userIdDst,
            userIdDstRd: false,
            userIdSrcDel: false,
            userIdDstDel: false,
            msg: payload.msg,
            stpId: payload.stpId,
            repostId: payload.repostId,
        };

        await this.messagesRepository.create<Messages>(message);

        return await this.findOneByMsgId(msgId);
    }

    async deleteMsgByUserByMsgId(userId: string, msgId: string) {
        const msg = await this.findOneByMsgId(msgId);

        if (!msg?.msgId) return 0;
        if (msg.userIdDst === userId) {
            return await this.messagesRepository.update(
                { userIdDstDel: true },
                {
                    where: {
                        msgId,
                    },
                },
            );
        }

        const answerDB = await this.messagesRepository.update(
            { userIdSrcDel: true },
            {
                where: {
                    msgId,
                },
            },
        );

        return answerDB;
    }

    async deleteByMsgId(msgId: string | string[]) {
        if (Array.isArray(msgId)) {
            const msgIds = msgId.map((value) => ({ msgId: value }));

            return await this.messagesRepository.destroy({
                where: {
                    [Op.or]: msgIds,
                },
            });
        }

        return await this.messagesRepository.destroy({ where: { msgId } });
    }

    async deleteAllByUserId(userId: string) {
        return await this.messagesRepository.destroy({
            where: {
                [Op.or]: [{ userIdDst: userId }, { userIdSrc: userId }],
            },
        });
    }

    async findOneByMsgId(msgId: string): Promise<Messages> {
        return await this.messagesRepository.findOne({
            where: { msgId },
        });
    }

    async createUniqueMsgId(): Promise<string> {
        let msgId = '';

        const createUniqueMsgIdLocal = async () => {
            msgId = Random.getRandomString(14);
            const result = await this.findOneByMsgId(msgId);

            if (result) await createUniqueMsgIdLocal();
        };

        await createUniqueMsgIdLocal();

        return msgId;
    }
}
