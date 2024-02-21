import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import * as jsonwebtoken from 'jsonwebtoken';
import * as config from 'config';
import { SocketCommand, UserSocketDataAnswer } from '../types/socket.types';

const JWT_SECRET = config.get<string>('JWT_SECRET');

@Injectable()
export class JwtAuthWSGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToWs();

        return this.validateRequest(request);
    }

    async validateRequest(request: WsArgumentsHost) {
        const socket = request.getClient() as Socket;

        try {
            const data = request.getData() as { token: string };
            const { token } = data;
            const verifyToken = jsonwebtoken.verify(token, JWT_SECRET) as {
                userId: string;
            };

            delete data['token'];
            data['userId'] = verifyToken.userId;
        } catch (error) {
            const data: UserSocketDataAnswer = {
                command: SocketCommand.getToken,
                userPayload: {
                    message: 'token is not valid',
                    payload: {},
                },
            };

            socket.emit(data.command, data.userPayload);

            return false;
        }

        return true;
    }
}
