import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('captcha')
export class CaptchaController {
    constructor(private readonly captchaService: CaptchaService) {}

    @ApiTags('captcha')
    @Get('*')
    @Header('Content-Type', 'image/jpeg')
    @Header('Cache-Control', 'no-cache')
    @Header('Content-Transfer-Encoding', 'binary')
    async getCaptcha(): Promise<StreamableFile> {
        const captcha = await this.captchaService.getImage();

        return new StreamableFile(captcha);
    }
}
