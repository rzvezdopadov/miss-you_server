import { Test, TestingModule } from '@nestjs/testing';
import { StickerpacksController } from './stickerpacks.controller';

describe('StickerpacksController', () => {
    let controller: StickerpacksController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StickerpacksController],
        }).compile();

        controller = module.get<StickerpacksController>(StickerpacksController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
