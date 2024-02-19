import * as config from 'config';
import jwtToken from 'jsonwebtoken';

const JWT_SECRET = config.get<string>('JWT_SECRET');

interface IdecodeJWT {
    userId: string;
    iat: number;
    exp: number;
}

export async function extractUserIdFromToken(jwt: string): Promise<string> {
    if (!jwt) return '';

    try {
        const decode = jwtToken.verify(jwt, JWT_SECRET) as IdecodeJWT;

        return decode.userId;
    } catch (error) {
        console.log(`core => token => extractUserIdFromToken:`, error);
    }
}
