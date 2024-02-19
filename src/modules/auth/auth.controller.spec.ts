import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CaptchaService } from '../captcha/captcha.service';
import { AuthService } from './auth.service';
import { authProviders } from './auth.providers';
import { JwtService } from '@nestjs/jwt';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { SignUpDto } from './dto/sugnup.dto';
import { Random } from '../../core/utils/random';
import { TownsArr } from '../towns/towns.types';
import { GenderArr, GenderVaporArr } from '../../core/types/profile.types';
import { databaseProviders } from '../../core/database/database.providers';

describe('AuthController', () => {
    let controller: AuthController;
    let signUpData: SignUpDto;
    // let userId: string;

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
            controllers: [AuthController],
            providers: [
                CaptchaService,
                AuthService,
                ProfilesService,
                JwtService,
                ...authProviders,
                ...profilesProviders,
                ...databaseProviders,
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('sugnup', async () => {
        const { token } = await controller.signUp(signUpData);

        expect(token).not.toHaveLength(0);
    });

    it('login', async () => {
        const { token } = await controller.login({
            email: signUpData.email,
            password: signUpData.password,
            captcha: '',
        });

        expect(token).not.toHaveLength(0);
    });

    afterAll(async () => {
        await (await databaseProviders[0].useFactory()).drop({});
    });
});
