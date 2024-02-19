import { Test, TestingModule } from '@nestjs/testing';
import { TownsController } from './towns.controller';
import { TownsArr } from './towns.types';

describe('TownsController', () => {
    let controller: TownsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TownsController],
        }).compile();

        controller = module.get<TownsController>(TownsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('get array of towns', async () => {
        expect((await controller.getTowns()).length).toBe(TownsArr.length);
    });
});
