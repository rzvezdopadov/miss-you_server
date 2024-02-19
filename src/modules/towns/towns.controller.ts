import { Controller, Get } from '@nestjs/common';
import { TownsArr } from './towns.types';
import { ApiTags } from '@nestjs/swagger';

@Controller('towns')
export class TownsController {
    @ApiTags('towns')
    @Get()
    async getTowns(): Promise<typeof TownsArr> {
        return TownsArr;
    }
}
