import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { ProfileCreateDto } from '../profiles/dto/profileCreate.dto';
import { Sequelize } from 'sequelize';
import { getForTestsProfilesCreateDto } from '../forTests/profiles';
import { databaseProviders } from '../../core/database/database.providers';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { messagesProviders } from './messages.providers';
import sequelize from 'sequelize';

describe('MessagesService', () => {
    let service: MessagesService;
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
                MessagesService,
                ProfilesService,
                ...messagesProviders,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        service = module.get<MessagesService>(MessagesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create unique msgId be have', async () => {
        const msgId = await service.createUniqueMsgId();

        expect(msgId).not.toHaveLength(0);
    });

    it('create msg', async () => {
        interface Msg {
            userIdDst: string;
            userIdSrc: string;
            msg: string;
        }

        const arrMsgs: Msg[] = [];
        let userIdSrc = fakeProfiles[0].userId;
        let userIdDst = fakeProfiles[1].userId;

        function addToArrMsgs() {
            for (let i = 0; i < 10; i++) {
                arrMsgs.push({
                    userIdSrc,
                    userIdDst,
                    msg: `message ${i} from ${userIdSrc} to ${userIdDst}`,
                });
            }
        }

        addToArrMsgs();
        // Total 10 msgs
        userIdSrc = fakeProfiles[1].userId;
        userIdDst = fakeProfiles[0].userId;

        addToArrMsgs();
        // Total 20 msgs

        userIdSrc = fakeProfiles[1].userId;
        userIdDst = fakeProfiles[2].userId;

        addToArrMsgs();
        // Total 30 msgs
        userIdSrc = fakeProfiles[2].userId;
        userIdDst = fakeProfiles[1].userId;

        addToArrMsgs();
        // Total 40 msgs

        for (const msg of arrMsgs) {
            await service.addMsgByUserId(msg.userIdSrc, {
                userIdDst: msg.userIdDst,
                stpId: '',
                msg: msg.msg,
                repostId: '',
            });
        }

        const answerDB = await sequelizeDB.query(
            `SELECT * FROM public."Messages"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerDB.length).toBe(40);
    });

    it('find all dialogs(id) by userId', async () => {
        const answerDB = await service.findAllDialogsByUserId(
            fakeProfiles[2].userId,
        );

        expect(answerDB.length).toBe(1);
    });

    it('find all messages by userId(first test)', async () => {
        const answerDB = await service.findAllMsgByUserId(
            fakeProfiles[2].userId,
            { userIdDst: fakeProfiles[1].userId, offset: 0, limit: 50 },
        );

        expect(answerDB.length).toBe(20);
    });

    it('delete msg by user by msgId', async () => {
        const msgs = await service.findAllMsgByUserId(fakeProfiles[2].userId, {
            userIdDst: fakeProfiles[1].userId,
            offset: 0,
            limit: 50,
        });

        const answerDB = await service.deleteMsgByUserByMsgId(
            fakeProfiles[2].userId,
            msgs[0].msgId,
        );

        expect(answerDB[0]).toBe(1);
    });

    it('find all messages by userId(second test)', async () => {
        const answerDB1 = await service.findAllMsgByUserId(
            fakeProfiles[1].userId,
            { userIdDst: fakeProfiles[2].userId, offset: 0, limit: 50 },
        );

        const answerDB2 = await service.findAllMsgByUserId(
            fakeProfiles[2].userId,
            { userIdDst: fakeProfiles[1].userId, offset: 0, limit: 50 },
        );

        expect(answerDB1.length).toBe(20);
        expect(answerDB2.length).toBe(19);
    });

    it('find one message by msgId', async () => {
        const answerDB1 = await service.findAllMsgByUserId(
            fakeProfiles[2].userId,
            { userIdDst: fakeProfiles[1].userId, offset: 0, limit: 50 },
        );

        const answerDB2 = await service.findOneByMsgId(answerDB1[0].msgId);

        expect(answerDB1[0].msgId).toBe(answerDB2.msgId);
        expect(answerDB1[0].msg).toBe(answerDB2.msg);
        expect(answerDB1[0].timecode).toBe(answerDB2.timecode);
    });

    it('delete by msgId', async () => {
        const answerDB1 = await service.findAllMsgByUserId(
            fakeProfiles[2].userId,
            { userIdDst: fakeProfiles[1].userId, offset: 0, limit: 50 },
        );

        const answerDB2 = await service.deleteByMsgId(answerDB1[0].msgId);
        const dialogs = await sequelizeDB.query(
            `SELECT * FROM public."Messages"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(answerDB2).toBe(1);
        expect(dialogs.length).toBe(39);
    });

    it('delete by msgId', async () => {
        await service.deleteAllByUserId(fakeProfiles[0].userId);
        const dialogs = await sequelizeDB.query(
            `SELECT * FROM public."Messages"`,
            {
                type: sequelize.QueryTypes.SELECT,
            },
        );

        expect(dialogs.length).toBe(19);
    });

    afterAll(async () => {
        await sequelizeDB.drop({});
    });
});
