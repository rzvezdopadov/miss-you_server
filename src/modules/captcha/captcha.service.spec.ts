import { Test, TestingModule } from '@nestjs/testing';
import { CaptchaService } from './captcha.service';

describe('CaptchaService', () => {
    let service: CaptchaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CaptchaService],
        }).compile();

        service = module.get<CaptchaService>(CaptchaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('get captcha image, have buffer data', async () => {
        const answer = await service.getImage();

        expect(answer.buffer.byteLength).not.toBe(0);
    });
});
