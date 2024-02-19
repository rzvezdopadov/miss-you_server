import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { authProviders } from './auth.providers';
import { ProfilesService } from '../profiles/profiles.service';
import { profilesProviders } from '../profiles/profiles.providers';
import { CaptchaService } from '../captcha/captcha.service';

const JWT_EXPIRATION = config.get<string>('JWT_EXPIRATION');
const JWT_SECRET = config.get<string>('JWT_SECRET');

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: JWT_EXPIRATION },
        }),
    ],
    providers: [
        CaptchaService,
        AuthService,
        ProfilesService,
        LocalStrategy,
        JwtStrategy,
        ...profilesProviders,
        ...authProviders,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
