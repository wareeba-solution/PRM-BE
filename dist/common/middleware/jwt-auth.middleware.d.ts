import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../modules/users/services/users.service';
export declare class JwtAuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
