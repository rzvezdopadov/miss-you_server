import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { AuthService } from './auth.service';

const JWT_SECRET = config.get<string>('JWT_SECRET');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: { userId: string }) {
        const user = await this.authService.findOneById(payload.userId);

        if (!user) {
            throw new UnauthorizedException(
                'You are not authorized to perform the operation',
            );
        }

        return payload;
    }
}
