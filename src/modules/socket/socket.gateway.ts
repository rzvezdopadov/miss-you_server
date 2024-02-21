import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthWSGuard } from '../../core/guards/jwtAuthWS.guard';
import {
    SocketCommand,
    UserSocket,
    UserSocketDataAnswer,
} from '../../core/types/socket.types';

const clients: UserSocket[] = [];

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MessagesGateway {
    @WebSocketServer() server: Server;

    @UseGuards(JwtAuthWSGuard)
    @SubscribeMessage(SocketCommand.getToken)
    async identity(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { userId: string },
    ): Promise<void> {
        this.addedUserToTable(client, data.userId);
    }

    handleConnection(client: Socket) {
        const data: UserSocketDataAnswer = {
            command: SocketCommand.getToken,
            userPayload: {
                message: 'token is not valid',
                payload: {},
            },
        };

        client.emit(data.command, data.userPayload);
    }

    handleDisconnect(client: Socket) {
        this.deleteUserFromTable(client);
    }

    addedUserToTable(client: Socket, userId: string) {
        clients.push({
            client,
            userId,
        });
    }

    deleteUserFromTable(client: Socket) {
        const position = clients.findIndex(
            (userSocket) => userSocket.client.id === client.id,
        );
        if (position === -1) return;

        clients.splice(position, 1);
    }

    sendPayloadByUserId(userIds: string[], payload: UserSocketDataAnswer) {
        clients.forEach((userSocket) => {
            if (userIds.includes(userSocket.userId))
                userSocket.client.emit(payload.command, payload.userPayload);
        });
    }
}
