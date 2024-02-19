import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER } from './core/constants';
import * as config from 'config';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const server = config.get<string>('SERVER') || SERVER.dev;

    if (server === SERVER.prod) {
        const domain = config.get<string>('DOMAIN') || SERVER.dev;
        const httpsPublicCertificate = fs.readFileSync(
            `/etc/letsencrypt/live/${domain}/fullchain.pem`,
        );
        const httpsPrivateKey = fs.readFileSync(
            `/etc/letsencrypt/live/${domain}/privkey.pem`,
        );
        const httpsOptions = {
            key: httpsPrivateKey,
            cert: httpsPublicCertificate,
        };
        const httpsPORT = config.get<string>('HTTPS_PORT') || 5443;
        const app = await NestFactory.create(AppModule, { httpsOptions });

        app.setGlobalPrefix('api/v1');
        app.useGlobalPipes(new ValidationPipe());
        await app.listen(httpsPORT);
        console.log(`Server started on the ${httpsPORT} port`);
    } else {
        const app = await NestFactory.create(AppModule);
        const httpPORT = config.get<string>('HTTP_PORT') || 5000;

        app.setGlobalPrefix('api/v1');
        app.useGlobalPipes(new ValidationPipe());

        const configDocBilder = new DocumentBuilder()
            .setTitle('Miss-you open API')
            .setDescription('This is open API for our meeting site')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, configDocBilder);
        SwaggerModule.setup('api', app, document);

        await app.listen(httpPORT);
        console.log(`Server started on the ${httpPORT} port`);
    }
}

bootstrap();
