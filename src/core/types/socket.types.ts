import { Socket } from 'socket.io';

export interface UserSocket {
    client: Socket;
    userId: string;
}

interface UserSocketPayload {
    message: string;
    payload: unknown;
}

export interface UserSocketDataAnswer {
    command: string;
    userPayload: UserSocketPayload;
}

export enum SocketCommand {
    getToken = 'getToken',
    getLike = 'getLike',
    changeLike = 'changeLike',
    addMessage = 'addMessage',
    deleteMessage = 'deleteMessage',
}
