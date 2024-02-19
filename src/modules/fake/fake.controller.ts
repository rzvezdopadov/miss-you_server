import { Controller, Delete, Get } from '@nestjs/common';
import { SERVER } from '../../core/constants';
import { FakeService } from './fake.service';
import * as config from 'config';
import { ApiTags } from '@nestjs/swagger';

const server = config.get<string>('SERVER');

@Controller('fake')
export class FakeController {
    constructor(private readonly fakeService: FakeService) {}

    @ApiTags('fake')
    @Get('generate')
    async generateUsers() {
        if (server === SERVER.prod)
            return { message: `this function is not supported` };

        await this.fakeService.createUsers();

        return { message: `users is create` };
    }

    @ApiTags('fake')
    @Delete('delete')
    async deleteUsers() {
        if (server === SERVER.prod)
            return { message: `this function is not supported` };

        await this.fakeService.deleteUsers();

        return { message: `users is delete` };
    }
}
