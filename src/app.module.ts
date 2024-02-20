import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AuthModule } from './modules/auth/auth.module';
import { TownsController } from './modules/towns/towns.controller';
import { CaptchaModule } from './modules/captcha/captcha.module';
import { FakeModule } from './modules/fake/fake.module';
import { LikesModule } from './modules/likes/likes.module';
import { ComplaintsService } from './modules/complaints/complaints.service';
import { ComplaintsController } from './modules/complaints/complaints.controller';
import { ShopController } from './modules/shop/shop.controller';
import { ShopService } from './modules/shop/shop.service';
import { StickerpacksService } from './modules/stickerpacks/stickerpacks.service';
import { StickerpacksController } from './modules/stickerpacks/stickerpacks.controller';
import { TransactionsController } from './modules/transactions/transactions.controller';
import { TransactionsService } from './modules/transactions/transactions.service';
import { VisitsService } from './modules/visits/visits.service';
import { VisitsController } from './modules/visits/visits.controller';
import { PhotosController } from './modules/photos/photos.controller';
import { PhotosService } from './modules/photos/photos.service';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
    controllers: [
        TownsController,
        ComplaintsController,
        ShopController,
        StickerpacksController,
        TransactionsController,
        VisitsController,
        PhotosController,
    ],
    providers: [
        ComplaintsService,
        ShopService,
        StickerpacksService,
        TransactionsService,
        VisitsService,
        PhotosService,
    ],
    imports: [
        DatabaseModule,
        AuthModule,
        ProfilesModule,
        FakeModule,
        CaptchaModule,
        LikesModule,
        MessagesModule,
    ],
})
export class AppModule {}
