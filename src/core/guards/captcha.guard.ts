import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CaptchaService } from '../../modules/captcha/captcha.service';
import * as config from 'config';
import { SERVER } from '../constants';

const server = config.get<string>('SERVER');

@Injectable()
export class CaptchaGuard implements CanActivate {
    constructor(private readonly captchaService: CaptchaService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return this.validateRequest(request);
    }

    async validateRequest(request) {
        if (server !== SERVER.prod) return true;

        const captchaExist = this.captchaService.isHaveCaptcha(
            request.body.captcha,
        );

        if (!captchaExist) {
            throw new ForbiddenException('The captcha is not valid');
        }

        return true;
    }
}
