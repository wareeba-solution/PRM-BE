export const authSchemas = {
    LoginDto: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'SecurePassword123!' }
        },
        required: ['email', 'password']
    },
    AuthResponseDto: {
        type: 'object',
        properties: {
            tokens: {
                type: 'object',
                properties: {
                    accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                }
            },
            user: { $ref: '#/components/schemas/SimpleUserDto' }
        }
    },
    RegisterDto: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', format: 'password', example: 'SecurePassword123!' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            organizationName: { type: 'string', example: 'ACME Healthcare' }
        },
        required: ['email', 'password', 'firstName', 'lastName', 'organizationName']
    },
    RegisterResponseDto: {
        type: 'object',
        properties: {
            user: { $ref: '#/components/schemas/SimpleUserDto' },
            organization: { $ref: '#/components/schemas/SimpleOrganizationDto' },
            tokens: {
                type: 'object',
                properties: {
                    accessToken: { type: 'string' },
                    refreshToken: { type: 'string' }
                }
            }
        }
    },
    RefreshTokenDto: {
        type: 'object',
        properties: {
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        },
        required: ['refreshToken']
    },
    ForgotPasswordDto: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' }
        },
        required: ['email']
    },
    ResetPasswordDto: {
        type: 'object',
        properties: {
            token: { type: 'string', example: 'abcdef123456' },
            password: { type: 'string', format: 'password', example: 'NewSecurePassword123!' }
        },
        required: ['token', 'password']
    },
    VerifyEmailDto: {
        type: 'object',
        properties: {
            token: { type: 'string', example: 'abcdef123456' }
        },
        required: ['token']
    },
    MessageResponseDto: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Operation successful' }
        }
    }
};