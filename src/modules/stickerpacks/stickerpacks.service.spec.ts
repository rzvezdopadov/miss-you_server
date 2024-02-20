import { Test, TestingModule } from '@nestjs/testing';
import { StickerpacksService } from './stickerpacks.service';

describe('StickerpacksService', () => {
  let service: StickerpacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickerpacksService],
    }).compile();

    service = module.get<StickerpacksService>(StickerpacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
