import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AuthModule } from './modules/auth/auth.module';
import { TownsController } from './modules/towns/towns.controller';
import { CaptchaModule } from './modules/captcha/captcha.module';
import { FakeModule } from './modules/fake/fake.module';
import { LikesModule } from './modules/likes/likes.module';

@Module({
    controllers: [TownsController],
    providers: [],
    imports: [
        DatabaseModule,
        AuthModule,
        ProfilesModule,
        FakeModule,
        CaptchaModule,
        LikesModule,
    ],
})
export class AppModule {}
