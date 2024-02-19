import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authProviders } from './auth.providers';
import { Random } from '../../core/utils/random';
import { databaseProviders } from '../../core/database/database.providers';
import { SignUpDto } from './dto/sugnup.dto';
import { TownsArr } from '../towns/towns.types';
import { GenderArr, GenderVaporArr } from '../../core/types/profile.types';
import * as jsonwebtoken from 'jsonwebtoken';

describe('AuthService', () => {
    let service: AuthService;
    let signUpData: SignUpDto;
    let userId: string;

    beforeAll(async () => {
        signUpData = {
            email: `${Random.getRandomInteger(1000, 2000)}@gmail.com`,
            password: `${Random.getRandomInteger(1000000, 2000000)}`,
            location: TownsArr[0],
            dayOfBirth: Random.getRandomInteger(1, 28),
            monthOfBirth: Random.getRandomInteger(1, 12),
            yearOfBirth: Random.getRandomInteger(1990, 2005),
            gender: Random.getRandomInteger(0, GenderArr.length - 1),
            genderVapor: Random.getRandomInteger(0, GenderVaporArr.length - 1),
            captcha: '',
        };
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule],
            providers: [AuthService, ...authProviders, ...databaseProviders],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create unique userId be have', async () => {
        userId = await service.createUniqueUserId();

        expect(userId).not.toHaveLength(0);
    });

    it('create user', async () => {
        const answer = await service.create(userId, signUpData);

        expect(answer.profile.email).toBe(signUpData.email);
    });

    it('find one user', async () => {
        const answer = await service.findOneById(userId);

        expect(answer.email).toBe(signUpData.email);
    });

    it('find all users', async () => {
        const answer = await service.findAllUserId();

        expect(answer.length).toBe(1);
    });

    it('compare password', async () => {
        const answer = await service.findOneById(userId);
        const isCompare = await service.comparePassword(
            signUpData.password,
            answer.password,
        );

        expect(isCompare).toBe(true);
    });

    it('generate token', async () => {
        const token = await service.generateToken(signUpData.email);
        const jwtPayload = jsonwebtoken.decode(token) as { userId: string };

        expect(jwtPayload.userId).toBe(userId);
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
