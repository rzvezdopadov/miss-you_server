import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.entity';
import { AUTH_REPOSITORY } from '../../core/constants';
import { SignUpDto } from './dto/sugnup.dto';
import { Random } from '../../core/utils/random';
import * as config from 'config';
import { Op } from 'sequelize';

const JWT_SALT_PASS = config.get<number>('JWT_SALT_PASS');
const JWT_SECRET = config.get<string>('JWT_SECRET');

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(AUTH_REPOSITORY) private readonly authRepository: typeof Auth,
    ) {}

    async validateUser(email: string, password: string) {
        const userObj = await this.findOneByEmail(email);

        if (!userObj) {
            return undefined;
        }

        const user = userObj['dataValues'];
        const match: boolean = await this.comparePassword(
            password,
            user.password,
        );

        if (!match) {
            return undefined;
        }

        return user;
    }

    async login(email: string) {
        const token = await this.generateToken(email);

        return { token };
    }

    async create(userId: string, user: SignUpDto) {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.authRepository.create<Auth>({
            userId,
            ...user,
            password: pass,
        });

        const result = newUser['dataValues'];
        const token = await this.generateToken(result.email);

        return { token, profile: result };
    }

    async delete(userId: string | string[]) {
        if (Array.isArray(userId)) {
            const userIds = userId.map((value) => ({ userId: value }));

            return await this.authRepository.destroy({
                where: {
                    [Op.or]: userIds,
                },
            });
        }

        return await this.authRepository.destroy({ where: { userId } });
    }

    async findAllUserId(): Promise<Auth[]> {
        const result = await this.authRepository.findAll<Auth>({
            attributes: ['userId'],
        });

        return result;
    }

    async generateToken(email: string): Promise<string> {
        const userId = (await this.findOneByEmail(email))['dataValues'].userId;
        const token = await this.jwtService.signAsync(
            { userId },
            { secret: JWT_SECRET },
        );

        return token;
    }
    async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, JWT_SALT_PASS);

        return hash;
    }

    async comparePassword(
        enteredPassword: string,
        dbPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, dbPassword);
    }

    async findOneByEmail(email: string): Promise<Auth> {
        return await this.authRepository.findOne<Auth>({ where: { email } });
    }

    async findOneById(userId: string): Promise<Auth> {
        return await this.authRepository.findOne<Auth>({ where: { userId } });
    }

    async createUniqueUserId(): Promise<string> {
        let userId = '';

        const createUniqueUserIdLocal = async () => {
            userId = Random.getRandomString(8);
            const result = await this.findOneById(userId);

            if (result) await createUniqueUserIdLocal();
        };

        await createUniqueUserIdLocal();

        return userId;
    }
}
