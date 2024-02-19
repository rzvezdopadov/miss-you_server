import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DoesUserExistGuard } from '../../core/guards/doesUserExist.guard';
import { SignUpDto } from './dto/sugnup.dto';
import { LoginDto } from './dto/login.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { CaptchaGuard } from '../../core/guards/captcha.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private profileService: ProfilesService,
    ) {}

    @ApiResponse({
        status: 200,
        description: 'The return token',
        content: {},
    })
    @ApiTags('auth')
    @UseGuards(CaptchaGuard, AuthGuard('local'))
    @Post('login')
    async login(@Body() loginData: LoginDto) {
        return await this.authService.login(loginData.email);
    }

    @ApiTags('auth')
    @UseGuards(CaptchaGuard, DoesUserExistGuard)
    @Post('signup')
    async signUp(@Body() authData: SignUpDto) {
        const userId = await this.authService.createUniqueUserId();
        const result = await this.authService.create(userId, authData);
        await this.profileService.create({
            userId: userId,
            photoMain: 0,
            photoLinks: [],
            signZodiac: 0,
            rating: 0,
            location: authData.location,
            name: '',
            discription: '',
            dayOfBirth: authData.dayOfBirth,
            monthOfBirth: authData.monthOfBirth,
            yearOfBirth: authData.yearOfBirth,
            growth: 0,
            weight: 0,
            gender: authData.gender,
            genderVapor: authData.genderVapor,
            education: 0,
            fieldOfActivity: 0,
            maritalStatus: 0,
            childrens: 0,
            religion: 0,
            smoke: 0,
            alcohol: 0,
            profit: 0,
            interests: [],
            likeCharacter: [],
            dontLikeCharacter: [],
        });

        return { token: result.token };
    }
}
