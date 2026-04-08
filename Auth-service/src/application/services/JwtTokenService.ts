import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import { TokenPayload, ITokenService } from './interfaces/ITokenService';
import { InvalidTokenError } from '../../domain/errors';

export class JwtTokenService implements ITokenService {
    private secretKey: string
    private expiresIn: SignOptions['expiresIn']

    constructor(secretKey: string, expiresIn: SignOptions['expiresIn'] = '24h') {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    async generateToken(payload: TokenPayload): Promise<string> {
        return jsonwebtoken.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    async verifyToken(token: string): Promise<TokenPayload> {
        try {
            return jsonwebtoken.verify(token, this.secretKey) as TokenPayload;
        } catch (error) {
            throw new InvalidTokenError();
        }
    }
}