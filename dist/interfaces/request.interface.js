"use strict";
// src/interfaces/request.interface.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Example usage of interfaces:
/*
// Middleware function using CustomRequest
export function authMiddleware(
    options: AuthMiddlewareOptions = {}
): RequestHandler {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
            // Add user to request
            const token = extractTokenFromHeader(req);
            const decodedToken = verifyToken(token);

            req.user = await getUserFromToken(decodedToken);
            req.deviceId = decodedToken.deviceId;
            req.sessionId = decodedToken.sessionId;

            // Check roles if specified
            if (options.roles && !options.roles.includes(req.user.role)) {
                throw new ForbiddenException('Insufficient role');
            }

            // Add organization if required
            if (options.requireOrganization) {
                req.organization = await getOrganization(req.user.organizationId);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

// Controller using typed request
@Controller('users')
export class UsersController {
    @Get('profile')
    async getProfile(@Req() req: AuthenticatedRequest) {
        return req.user;
    }

    @Get('organization')
    async getOrganization(@Req() req: OrganizationRequest) {
        return req.organization;
    }
}
*/ 
//# sourceMappingURL=request.interface.js.map