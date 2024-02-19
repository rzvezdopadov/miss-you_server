import { Controller, Body, UseGuards, Get, Put, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileFullDto } from './dto/profileFull.dto';
import { ProfilesShortDto } from './dto/profilesShort.dto';
import { ProfileSetDto } from './dto/profileSet.dto';
import { JwtAuthGuard } from '../../core/guards/jwtAuth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @ApiBearerAuth()
    @ApiTags('profiles')
    @UseGuards(JwtAuthGuard)
    @Get('short')
    async getShortProfile(@Body() profilesData: ProfilesShortDto, @Req() req) {
        const userId = req?.user?.userId as string;

        return await this.profilesService.findAllByFilters(
            userId,
            profilesData,
        );
    }

    @ApiBearerAuth()
    @ApiTags('profiles')
    @UseGuards(JwtAuthGuard)
    @Get('full')
    async getFullProfiles(@Body() profilesData: ProfileFullDto, @Req() req) {
        const userId = profilesData.userId
            ? profilesData.userId
            : (req?.user?.userId as string);

        return await this.profilesService.findOneById(userId);
    }

    @ApiBearerAuth()
    @ApiTags('profiles')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        // type: ,
    })
    @UseGuards(JwtAuthGuard)
    @Put('full')
    async setFullProfiles(@Body() profileData: ProfileSetDto, @Req() req) {
        const userId = req?.user?.userId as string;
        await this.profilesService.updateById(userId, profileData);
        const newProfile = await this.profilesService.findOneById(userId);

        return newProfile;
    }
}
