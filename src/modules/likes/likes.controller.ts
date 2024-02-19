import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwtAuth.guard';
import { LikeSetDto } from './dto/likeSet.dto';
import { LikesService } from './likes.service';
import { LikesGetProfilesDto } from './dto/likesGetProfiles.dto';
import { LikeDeleteDto } from './dto/likeDelete.dto';

@Controller('likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    @ApiBearerAuth('jwt')
    @ApiTags('likes')
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfileFromLikes(
        @Body() likesGetData: LikesGetProfilesDto,
        @Req() req,
    ) {
        const userId = req?.user?.userId as string;

        return await this.likesService.getProfilesFromUserId(
            userId,
            likesGetData,
        );
    }

    @ApiBearerAuth()
    @ApiTags('likes')
    @UseGuards(JwtAuthGuard)
    @Post()
    async setLike(@Body() likeSetData: LikeSetDto, @Req() req) {
        const userId = req?.user?.userId as string;

        return await this.likesService.changeLikeById(userId, likeSetData);
    }

    @ApiBearerAuth()
    @ApiTags('likes')
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteLike(@Body() likeDeleteData: LikeDeleteDto, @Req() req) {
        const userId = req?.user?.userId as string;

        return await this.likesService.deleteLikeById(userId, likeDeleteData);
    }
}
