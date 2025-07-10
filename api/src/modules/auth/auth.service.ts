import { Injectable } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';

@Injectable()
export class AuthService {
    async authenticate( authenticateDto: AuthenticateDto) {
        return { authenticateDto }
    }
}
