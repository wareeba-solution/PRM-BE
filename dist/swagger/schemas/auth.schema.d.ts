export declare const authSchemas: {
    LoginDto: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    AuthResponseDto: {
        type: string;
        properties: {
            tokens: {
                type: string;
                properties: {
                    accessToken: {
                        type: string;
                        example: string;
                    };
                    refreshToken: {
                        type: string;
                        example: string;
                    };
                };
            };
            user: {
                $ref: string;
            };
        };
    };
    RegisterDto: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
            firstName: {
                type: string;
                example: string;
            };
            lastName: {
                type: string;
                example: string;
            };
            organizationName: {
                type: string;
                example: string;
            };
        };
        required: string[];
    };
    RegisterResponseDto: {
        type: string;
        properties: {
            user: {
                $ref: string;
            };
            organization: {
                $ref: string;
            };
            tokens: {
                type: string;
                properties: {
                    accessToken: {
                        type: string;
                    };
                    refreshToken: {
                        type: string;
                    };
                };
            };
        };
    };
    RefreshTokenDto: {
        type: string;
        properties: {
            refreshToken: {
                type: string;
                example: string;
            };
        };
        required: string[];
    };
    ForgotPasswordDto: {
        type: string;
        properties: {
            email: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    ResetPasswordDto: {
        type: string;
        properties: {
            token: {
                type: string;
                example: string;
            };
            password: {
                type: string;
                format: string;
                example: string;
            };
        };
        required: string[];
    };
    VerifyEmailDto: {
        type: string;
        properties: {
            token: {
                type: string;
                example: string;
            };
        };
        required: string[];
    };
    MessageResponseDto: {
        type: string;
        properties: {
            message: {
                type: string;
                example: string;
            };
        };
    };
};
